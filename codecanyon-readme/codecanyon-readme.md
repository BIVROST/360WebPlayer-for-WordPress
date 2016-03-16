BIVROST 360WebPlayer for WordPress
==================================

The BIVROST 360WebPlayer is the easiest way to stream 360 videos and pictures on your website or blog.

This plugin enables you to embed the BIVROST 360WebPlayer in a simple, WordPress way.

![360WebPlayer on a laptop and phone](codecanyon-readme/README-player.png)


Features
--------

* Fast visual setup.
* Easy to use for the end user.
* Both desktop and mobile.
* Free for personal use (see [license][license-free] for details).
* Works on all major browsers.
* Possible to embed more than one player on the same page.
* Mono and stereoscopic video and pictures.
* HTTP Live Streaming (HLS).
* [WebVR][webvr] (MozVR) support - works with Oculus Rift, Cardboard and more.
* Supports watching content in external native players (also [supplied by Bivrost][bivrost]).
* We want to hear your feedback and ideas for new features, to make it even better.

[bivrost]: http://bivrost360.com
[webvr]: http://webvr.info/
[github]: http://github.com/Bivrost/


Installation
------------

To add a the BIVROST 360WebPlayer plugin using the built-in plugin installer:

1. Go to `Plugins > Add New > Send plugin` and upload the zip file containing the plugin
2. Go to `Plugins > Installed` and enable the plugin

After instalation, you will have a new button in the WYSYWIG editor. Alternatively, use there is a [bivrost-player] shortcode available



Usage
-----

For a video see [this YouTube video tutorial][youtube].

[youtube]: https://youtu.be/_xYJIyk0uB8


### in the visual editor

![The wordpress UI](screenshot-2.png)

To use the plugin in visual mode, open up a post or page editor, and simply press the BIVROST 360WebPlayer button. You will look at a window to configure the player and select videos or pictures that you want to display. 

To add videos press the "add source" button, you can add more than one video at once using the shift, opt or control button. For best results add both a webm/vp6 and a mp4/h264.

After you save your configuration, you will see a placeholder for the player. Press "preview changes" or publish the page to see the player in action.

To edit your player, just click it and press the "edit" icon on top of it - just as you would with a normal WordPress video.

### with shortcodes

For text mode, there is a shortcode defined:

`[bivrost-player loop="true"]
my_vr_movie.mp4
my_vr_movie.webm
[/bivrost-player]`

Place the picture or movie urls inside the `[bivrost-player]` tag separated by newlines. For best results add both a webm/vp6 and a mp4/h264.

Configure the player using attributes in the shortcode. 

### more information

For more information, view our [GitHub project][github].

Changelog
---------

### 1.0 (TODO: data wydania)

Initial release
