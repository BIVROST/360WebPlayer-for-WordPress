<?php

/**
 * @package BIVROST 360WebPlayer for WordPress
 * @author Bivrost
 * @license Custom opensource license: http://github.com/Bivrost/360WebPlayer/#License
 * @link http://bivrost360.com
 * @copyright (c) 2015, Bivrost sp. z o.o.
 * 
 * @wordpress-plugin
 * Plugin Name: BIVROST 360WebPlayer
 * Plugin URI: http://bivrost360.com
 * Description: Easy virtual reality on desktop and mobile: the BIVROST 360WebPlayer is a simple way to show 360 videos and pictures on your blog or website.
 * Version: 1.0
 * Author: Bivrost
 * Author URI: http://bivrost360.com
 * Text Domain: bivrost
 * Domain Path: /languages
 * License:     Custom opensource license
 * License URI: http://github.com/Bivrost/360WebPlayer/#License
 * Tags: video, 360, spherical, vr, panorama, embed, image, media, shortcode, virtual reality
 * Requires at least: 4.2.0
 * Tested up to: 4.3
 */

if(!function_exists('add_action'))
	die("BIVROST 360WebPlayer for WordPress");

function bivrost_enqueue_scripts() {
	wp_register_script('bivrost-player', plugins_url('bivrost.js', __FILE__));
	wp_register_style('bivrost-player', plugins_url('bivrost.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'bivrost_enqueue_scripts');



function bivrost_player_shortcode($attrs, $content) {
	wp_enqueue_style('bivrost-player');
	wp_enqueue_script('bivrost-player');
	
	$srcs=array();

	$shortcode_matches=array();
	preg_match_all( '/' . get_shortcode_regex() . '/s', $content, $shortcode_matches, PREG_SET_ORDER );
	foreach($shortcode_matches as $match) {
		$tag=$match[2];
		if($tag !== 'video')
			continue;
		$shortcode=shortcode_parse_atts($match[0]);
		if(isset($shortcode["src"]))
			$srcs[$shortcode["src"]]="";
	}
	
	if(empty($srcs))
		foreach(array_filter(array_map('trim', explode("\n", strip_shortcodes(strip_tags ($content))))) as $srcAndType) {
			list($src, $type)=explode('#', $srcAndType.'#');
			$srcs[$src]=$type;
		}

	$available_attrs=array(
//		'url'
//		'type'		
		'loop' => '/^(true|false)$/',
		'autoplay' => '/^(true|false)$/',
		'stereoscopy' => '/^(autodetect|mono|side-by-side|top-and-bottom|top-and-bottom-reversed)$/',
		'projection' => '/^(equirectangular|cubemap|cubemap:.+)$/',
		'source' => '/^(autodetect|video|picture)$/',
		'theme' => '/^(default|spring|autumn)$/',
		'width' => '/^(\d*.+$|$)/',
		'height' => '/^(\d*.+$|$)/'
	);
	
	if($attrs && isset($attrs['url'])) {
		$srcs[$attrs['url']]=isset($srcs['type'])?$srcs['type']:"";
		unset($attrs['url']);
		unset($attrs['type']);
	}
	
	$theme=null;
	$width=null;
	$height=null;
	
	foreach(array('theme', 'width', 'height') as $attrName) {
		if($attrs && isset($attrs[$attrName])) {
			$$attrName=$attrs[$attrName];
			unset($attrs[$attrName]);
		}
	}
	
	$urlencode=false;
	$attr=array();
	if($attrs)
		foreach($attrs as $k => $v) {
			if($k === 'urlencode')
				$urlencode=json_decode($v);
			else if(isset($available_attrs[$k])) {
				if(preg_match($available_attrs[$k], $v))
					$attr[$k]=$v;
				else
					;	// TODO: warning
			}
		};
	
	ob_start();
	?>
		<bivrost-player<?php 
				foreach($attr as $k => $v):
					?> <?=$k?>="<?=$v?>"<?php 
				endforeach;
				
				if($theme):
					?>  class="bivrost-theme-<?=$theme?>"<?php 
				endif;
				
				if($width || $height):
					?> style="<?php if($width): ?>width:<?=$width?>; <?php endif ?><?php if($height): ?>width:<?=$height?>; <?php endif ?>"<?php
				endif;
			?>>
			<?php foreach($srcs as $src => $type): ?>
			<bivrost-media url="<?=$src?>"<?php if($type): ?> type="<?=$type?>"<?php endif ?>></bivrost-media>
			<?php endforeach ?>
		</bivrost-player>
	<?php
	return ob_get_clean();
}
add_shortcode('bivrost-player', 'bivrost_player_shortcode');


// tinymce integration
function bivrost_mce_button($buttons) {
	array_push($buttons, 'bivrost_button');
	return $buttons;
}
function bivrost_mce_plugin($plugins) {	
	$plugins['bivrost']=plugins_url('bivrost-tinymce.js', __FILE__);
	return $plugins;
}
function bivrost_admin_init() {
	wp_enqueue_script('thickbox');
	add_filter('mce_buttons', 'bivrost_mce_button');
	add_filter('mce_external_plugins', 'bivrost_mce_plugin');
}
add_filter('admin_init', 'bivrost_admin_init');
