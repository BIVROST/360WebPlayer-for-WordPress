BIVROST 360WebPlayer for WordPress
==================================

Embed 360° videos and pictures on your Wordpress blog with the BIVROST 360WebPlayer Plugin.

![360WebPlayer for desktop and mobile](codecanyon-readme/README-player.png)


Features
--------

* Fast setup.
* Easy to use.
* Desktop and mobile friendly.
* Free for personal use (see [license][license-free] for details).
* Works on all major browsers.
* Supports Mono and stereoscopic videos and pictures.
* HTTP Live Streaming (HLS).
* [WebVR][webvr] (MozVR) support - works with Oculus Rift, Cardboard and many more.
* Supports watching content in an external native player (also [supplied by Bivrost][bivrost]).

* If there is anything you miss in our player then let us know.

[bivrost]: http://bivrost360.com
[webvr]: http://webvr.info/
[github]: http://github.com/Bivrost/


Installation
------------

Add the BIVROST 360WebPlayer plugin using the built-in plugin installer:

1. Go to `Plugins > Add New > Send plugin` and upload the plugin file (zip)
2. Go to `Plugins > Installed` and enable the plugin

After installation, you will have a new button in the WYSYWIG editor. There is a also a [bivrost-player] shortcode available.



Tutorial
-----

For a tutorial see [this YouTube video][youtube].

[youtube]: https://youtu.be/_xYJIyk0uB8


### Visual Editor

![The wordpress UI](screenshot-2.png)

Open the post or page editor and press the BIVROST 360WebPlayer button. Now you can configure the player and select the videos or pictures you want to display. 

To add videos press the "add source" button. You can add more than one video at once using the shift, opt or control button. For best results add both a webm/vp6 and a mp4/h264 version.

After you save your settings, you will see a placeholder for the player. Press "preview changes" or publish the page to see the player in action.

To edit your player, just click and press "edit" on top of it - just as you would with a normal WordPress video.

### Shortcodes

In text mode, there is a shortcode:

`[bivrost-player loop="true"]
my_vr_movie.mp4
my_vr_movie.webm
[/bivrost-player]`

Put the picture or movie urls in the `[bivrost-player]` tag separated by newlines. For best results add both a webm/vp6 and a mp4/h264 version.

Configure the player using attributes in the shortcode. 

### more information

For more information, visit our [GitHub project][github].

Changelog
---------

### 1.0 (TODO: data wydania)

Initial release
