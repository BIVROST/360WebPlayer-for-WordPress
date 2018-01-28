<?php
// https://codex.wordpress.org/Plugin_API/Filter_Reference/mce_external_languages
// This file is based on wp-includes/js/tinymce/langs/wp-langs.php

if(!defined('ABSPATH'))
	exit;

if(!class_exists('_WP_Editors'))
	require(ABSPATH.WPINC.'/class-wp-editor.php');

//load_plugin_textdomain('bivrost-360webplayer', false, basename(dirname(__FILE__)) . '/languages/');
//print '<script type="text/javascript">console.log('.json_encode(__FILE__.__("Source type", "bivrost-360webplayer")).');</script>';

$strings='tinyMCE.addI18n("'._WP_Editors::$mce_locale.'.bivrost-360webplayer", '.json_encode(array(
	'custom_uploader_select_files' => __('Select movie and alternate sources', 'bivrost-360webplayer'),
	'title_360webplayer_configuration' => __('BIVROST 360WebPlayer configuration', 'bivrost-360webplayer'),
	'label_loop' => __('Should the movie loop?', 'bivrost-360webplayer'),
	'label_autoplay' => __('Should the movie play automaticaly on load?', 'bivrost-360webplayer'),
	'label_source' => __('Source type', 'bivrost-360webplayer'),
	'label_stereoscopy' => __('Stereoscopy type', 'bivrost-360webplayer'),
	'label_projection' => __('Projection type', 'bivrost-360webplayer'),
	'label_theme' => __('Theme', 'bivrost-360webplayer'),
	'label_width' => __('Widget width in css units (px, %, etc), leave empty for default', 'bivrost-360webplayer'),
	'label_height' => __('Widget height in css units (px, %, etc), leave empty for default', 'bivrost-360webplayer'),
	'button_add_gallery' => __('add source from media gallery or upload', 'bivrost-360webplayer'),
	'button_add_url' => __('add source by url', 'bivrost-360webplayer'),
	'sources_list' => __('360 video or picture sources:', 'bivrost-360webplayer'),
	'sources_empty' => __('No 360 video or picture sources found. Add them using the \'add source\' button', 'bivrost-360webplayer'),
	'prompt_url' => __('Enter URL to movie or picture', 'bivrost-360webplayer'),
	'button_remove' => __('remove', 'bivrost-360webplayer'),
	'button_add_360webplayer' => __('BIVROST 360WebPlayer', 'bivrost-360webplayer'),
)).");\n";