<?php

/*
Plugin Name: BIVROST 360WebPlayer
Version: 1.0
*/

function bivrost_enqueue_scripts() {
	wp_register_script('bivrost-player', plugins_url('bivrost.js', __FILE__));
	wp_register_style('bivrost-player', plugins_url('bivrost.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'bivrost_enqueue_scripts');



function bivrost_player_shortcode($attrs, $content) {
	wp_enqueue_style('bivrost-player');
	wp_enqueue_script('bivrost-player');
	
	// TODO: option for urlencode
	
	$srcs=array();
	foreach(array_filter(array_map('trim', explode("\n", strip_tags ($content)))) as $srcAndType) {
		@list($src, $type)=explode('#', $srcAndType);
		$srcs[$src]=$type;
	};


	$available_attrs=array(
//		'url'
//		'type'
		'loop' => '/^(true|false)$/',
		'autoplay' => '/^(true|false)$/',
		'stereoscopy' => '/^(autodetect|mono|side-by-side|top-and-bottom|top-and-bottom-reversed)$/',
		'projection' => '/^(equirectangular|cubemap|cubemap:.+)$/',
		'source' => '/^(autodetect|video|picture)$/'
	);
	
	if($attrs && isset($attrs['url'])) {
		$srcs[$attrs['url']]=isset($srcs['type'])?$srcs['type']:"";
		unset($attrs['url']);
		unset($attrs['type']);
	}
	
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
		<bivrost-player<?php foreach($attr as $k => $v):?> <?=$k?>="<?=$v?>"<?php endforeach?>>
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
