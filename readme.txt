=== BIVROST 360WebPlayer ===
Contributors: chanibal
Tags: video, 360, spherical, vr, panorama, embed, image, media, shortcode, virtual reality
Requires at least: 4.2.0
Tested up to: 4.3.1
Stable tag: trunk
License: Custom opensource license
License URI: http://github.com/Bivrost/360WebPlayer/#License

Easy virtual reality on desktop and mobile: the BIVROST 360WebPlayer is a simple way to show 360 videos and pictures on your blog or website.


== Description ==

= Features = 

* Easy visual setup
* Simple for the end user
* Works on both desktop and mobile
* Free for personal use (see the license for details)
* Works on major browsers
* Possible to embed more than one on the same page
* Themable
* Supports mono and stereoscopic pictures and video
* [WebVR][11] (MozVR) support - working with Oculus Rift DK1, DK2, cardboard and more
* Lots of configuration options
* Supports viewing media in native players (also [supplied by Bivrost][1])
* Accepting feature requests - tell us what you want in the player!


[1]: http://bivrost360.com
[11]: http://webvr.info/



= Usage in visual editor =

To use the plugin in visual mode, open up a post or page editor, and simply press the BIVROST 360WebPlayer button. You will look at a window to configure the player and select videos or pictures that you want to display. 

To add videos press the "add source" button, you can add more than one video at once using the shift, opt or control button. For best results add both a webm/vp6 and a mp4/h264.

After you save your configuration, you will see a placeholder for the player. Press "preview changes" or publish the page to see the player in action.

To edit your player, just click it and press the "edit" icon on top of it - just as you would with a normal WordPress video.

= Usage with shortcodes =

For text mode, there is a shortcode defined:

`[bivrost-player loop="true"]
my_vr_movie.mp4
my_vr_movie.webm
[/bivrost-player]`

Place the picture or movie urls inside the `[bivrost-player]` tag separated by newlines. For best results add both a webm/vp6 and a mp4/h264.

Configure the player using attributes in the shortcode. Look at the next section for a list of available options, none of them are required.


= Available options =

*	`theme`: what skin to use? You have 5 skins available:
	* "default" - black and blue
	* "spring" - black and green
	* "autumn" - orange and red with a leaves background
	* "winter" - white and blue
	* "turquoise" - blue and violet
	optional, default: "default"

*	`width`: force the width of the player. By default the player fits to the width of available width and a 4:3 aspect, but you can override this.
	Provide a value in css units, ex. `500px` or `75%`.

*	`height`: force the height of the player. By default the height is derived from the width and with a 4:3 aspect.
	Provide a value in css units, ex. `500px` or `75%`.

*	`loop`: should the media loop? 
	Allowed values: "true", "false";  
	optional, default: "false".

*	`autoplay`: should the media be played on load? This might fail on some platforms (android).
	Allowed values: "true", "false";  
	optional, default: "true".

*	`stereoscopy`: what kind of stereoscopy is this media in?  
	Allowed values:  
	
	* "autodetect" - guess by filename tags and media ratio (see: [Media preparation guide][80]), 
	* "mono" - whole image used,
	* "side-by-side" - image for left eye is on the left half, and right on the right half of the media,
	* "top-and-bottom" - the left eye is the top half of the image, the right one in the bottom half,
 	* "top-and-bottom-reversed" - the left eye is the bottom half of the image, the right one in the top half;

	optional, default: "autodetect".

*	`source`: is this a video or picture?
	Allowed values: "video", "picture", "autodetect";
	optional, default: "autodetect"
	
*	`projection`: reserved for future use; what is the projection (mapping from 2d to 3d) of the media?
	Allowed value: "equirectangular", "cubemap", "cubemap:configuration...";
	optional, default: "equirectangular".
	Cubemap can be configured with cubemap type. There are a few presets defining the order of faces: 

	* "horizontal" (default) - all sides of the cube are in one line in the order; left, right, down, up, back, front. OBRX uses this format.
	* "two-by-three" - sides are in two rows: left, right, down and up, bottom, front. Facebook 360 videos use this format.
	* "facebook" - the same as in two-by-three, but rotated and each face is cropped by 1%.
	* "horizontal-cross" - sides are in a cross with bottom, right, front and left in the middle row; up is in the top row and down in the bottom. 
	* "vertical-cross" - up is in the first row, bottom, right and front in the second, left in the third and down in the fourth. ATI CubeMapGen uses this format.
	* custom - advanced and available only in shortcode mode, please use presets if possible; you can specify any alignment with a simple description string. The order string is an 2d array of face names in the order they appear on the texture. The rows are separated by "," and the faces are one letter acronyms (also accepts capital letters):

		*  "f" - front
		*  "b" - back
		*  "l" - left
		*  "r" - right
		*  "u" - up
		*  "d" - down
		*  "-" - unused space

		Each face can be supplied with a rotation with `*x` where x is a number from 0 to 3.

		Additionally two optional modifiers are supported at the end of the string:

		*  ">90" - rotate clockwise by x degrees (90 in example)
		*  "<72" - rotate counter clockwise by x degrees (72 in example)
		*  "+0.01" - crop faces by amount (prevents visible edges)

		Example: `-u--,blfr,-d*2-->90+0.002`


= Commercial Use =

Please note, the license allows only for non-commercial use of the player. Commercial use requires you to acquire a license, please see License for details.


== Installation ==

To add a the BIVROST 360WebPlayer plugin using the built-in plugin installer:

1. Go to `Plugins > Add New > Send plugin` and upload the zip file containing the plugin OR unpack the plugin to `wp-content/plugins/bivrost-360webplayer` directory on the server
2. Go to `Plugins > Installed` and enable the plugin

After instalation, you will have a new button in the WYSYWIG editor. Alternatively, use there is a [bivrost-player] shortcode available


== Frequently Asked Questions == 

= Available keyboard shortcuts =

* ` ↑ ` ` → ` ` ↓ ` ` ← ` - look around
* ` space ` - pause/play
* ` F ` or doubleclick movie - fullscreen
* ` V ` - enter/toggle VR mode
 ` escape ` - exit fullscreen/VR mode
* ` [ `, ` ] ` - scroll movie by 5 seconds
* ` + `, ` - ` - zoom in/out (not available in VR mode)


= Virtual Reality on the desktop with WebVR =

At the time of writing, WebVR is supported by Firefox Nightly with an extension. It supports Oculus Rift and (allegedly) other headsets like HTC Vive.

See instructions at [MozVR][81] and [WebVR.info][82] for how to setup your browser.

When you have a working setup, press ` V ` or the "eye" button to go to VR mode.

[81]: http://mozvr.com/downloads/
[82]: http://webvr.info/


= Virtual Reality in mobile with Google Cardboard =

It is possible to use the Bivrost 360Player with Google Cardboard and it's many clones. Just press the "eye" button to go to VR mode.

Some tips:

* Be sure to enable screen rotation on your device.
* If you have a NFC tag in your cardboard it might be a good idea to disable NFC in your phone as it will run the cardboard app instead of allowing you to use a browser.
* Some phones lack a gyroscope, if you have problems looking left and right, but looking up and down works this means that your phone manufacturer did not install one. The phone tries to compensate this with a compass (magnetometer), but the results are far from good.
* Consider setting a longer time for screen timeout.


= Platform availability =

We try to make the player run on as many platforms as possible, but we still have far from 100% coverage. Major unsupported platforms are:

* iOS - only pictures work, videos are distorted and without a user interface
* Windows Phone - only pictures work, videos are black
* GearVR - currently no way to run a web browser

If you're experiencing problems with any other recent platform, please let us know.


= Video does not work or has issues =

Check if your device supports this kind of video (play it in the browser directly). Some devices support only up to 1920x1080 resolution and only mp4/h264 or webm. Look at the [Media Preparation Guide][80] for details on how to make portable video.

[80]: http://github.com/Bivrost/360WebPlayer/#Media%20preparation%20guide



== License ==

There are two separate licenses to choose from:

1. [The free license][92] - use for web sites that are non commercial
2. [The paid license][93] - use for commercial web sites, one license per domain (contact [sales][94] for payment).

If you want to remove or replace our branding or are unsure about which license applies to you, please [contact us for help and additional licensing options][94].

[92]: http://github.com/Bivrost/360WebPlayer/LICENSE-free.txt
[93]: http://github.com/Bivrost/360WebPlayer/LICENSE-paid.txt
[94]: mailto:TODO sales@bivrost360.com

== Screenshots ==

1. Installed player

2. Configuration panel


== Changelog ==

= 1.0 =

Initial release
