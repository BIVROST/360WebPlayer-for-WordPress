=== BIVROST 360WebPlayer for WordPress ===
Contributors: chanibal  
Tags: video, 360, spherical, vr, panorama, embed, image, media, shortcode, virtual reality  
Requires at least: 4.2.0  
Tested up to: 4.9.2  
Requires PHP: 5.2  
Stable tag: trunk  
License: GPL v2  

The BIVROST 360WebPlayer for WordPress is the easiest way to stream 360 videos and pictures on your website or blog.


== Description ==

Embed 360° videos and pictures on your WordPress blog with the BIVROST 360WebPlayer for WordPress Plugin.

= Features = 


* Fast integration into any web site.
* Easy to use for the end user.
* Both desktop and mobile.
* Free for personal use (see license for details).
* Works on all major browsers and systems.
* Possible to embed more than one player on the same page.
* Mono and stereoscopic video and pictures.
* HTTP Live Streaming (HLS).
* Works well with touch.
* Well tested - supports many edge cases.
* [WebVR][webvr] support - works with Oculus Rift, Vive, Windows Mixed Reality, OSVR, GearVR, Google Cardboard and more.
* Supports watching content in external native players ([by BIVROST][player-windows]).

We want to hear your feedback and ideas for new features, to make it even better.

[bivrost]: http://bivrost360.com
[webvr]: http://webvr.info/
[player-windows]: https://download.bivrost360.com/player-desktop/


= Visual Editor =

For a tutorial see [this YouTube video][yt].

[yt]: https://youtu.be/_xYJIyk0uB8

Open the post or page editor and press the BIVROST 360WebPlayer button. Now you can configure the player and select the videos or pictures you want to display. 

To add videos press the "add source" button. You can add more than one video at once using the shift, opt or control button. For best results add both a webm/vp6 and a mp4/h264 version.

After you save your settings, you will see a placeholder for the player. Press "preview changes" or publish the page to see the player in action.

To edit your player, just click and press "edit" on top of it - just as you would with a normal WordPress video.

= Shortcodes =

In text mode, there is a shortcode:

`[bivrost-player loop="true"]  
my_vr_movie.mp4  
my_vr_movie.webm  
[/bivrost-player]`

Put the picture or movie urls in the `[bivrost-player]` tag separated by newlines. For the best result add both a webm/vp6 and a mp4/h264 version.

You can configure the player using attributes in the shortcode. Below you can find several options, none of them are required.



= Available options =

*	`theme`: which skin do you want? There are 3 skins available:
	* "default" - black and blue
	* "spring" - black and green
	* "autumn" - black and red
	optional, default: "default"

*	`width`: sets the width of the player. By default the player fits to the available width in a 4:3 aspect ratio. You can override this.
	Provide a value in css units, ex. `500px` or `75%`.

*	`height`: sets the height of the player. By default the height is derived from its width and is set in 4:3 aspect ratio.
	Provide a value in css units, ex. `500px` or `75%`.

*	`loop`: allows the video to loop 
	Allowed values: "true", "false";  
	optional, default: "false".

*	`autoplay`: should the content play automatically?
	Allowed values: "true", "false";  
	optional, default: "true".

*	`stereoscopy`: which form of stereoscopy is used?  
	Allowed values:  
	
	* "autodetect" - detects by filename tags and media ratio (see: Media preparation guide), 
	* "mono" - whole image used,
	* "side-by-side" - the image for left eye is on the left half, and right on the right half of the media,
	* "top-and-bottom" - the left eye is the top half of the image, the right one on the bottom half,
 	* "top-and-bottom-reversed" - the left eye is the bottom half of the image, the right one on the top half;

	optional, default: "autodetect".

*	`source`:  is it a video or picture?
	Allowed values: "video", "picture", "stream-hls", "stream-dash", "autodetect";
	optional, default: "autodetect"
	
*	``projection`: how is the media projected (mapping from 2d to 3d)?
	Allowed value: "equirectangular", "cubemap", "cubemap:configuration...";
	optional, default: "equirectangular".
	Cubemap can be configured through several cubemap types. There are a few presets defining the order: 

	* "horizontal" (default) - all sides of the cube are in one line in the following order; left, right, down, up, back, front. OBRX uses this format.
	* "two-by-three" - all sides are in two rows: left, right, down and up, bottom, front. Facebook 360 videos use this format.
	* "facebook" - the same as two-by-three, but rotated, and each face is cropped by 1%.
	* "horizontal-cross" - all sides are in a cross with bottom, right, front and left in the middle row; up is in the top row and down in the bottom. 
	* "vertical-cross" - up is in the first row, bottom, right and front in the second, left in the third and down in the fourth. ATI CubeMapGen uses this format.
	* custom - advanced, please use presets if possible; you can specify any alignment with a description string. The string is a 2d array of face names in order of how they appear in the texture. The rows are separated by "," and the faces are one letter acronyms (accepts capital letters):

		*  "f" - front
		*  "b" - back
		*  "l" - left
		*  "r" - right
		*  "u" - up
		*  "d" - down
		*  "-" - unused space

	Each face can be rotated with `*x`.  x is a number from 0 to 3. For example `r*1` is right rotated 90 degrees clockwise.

	There are optional modifiers at the end of the string:

	*  ">90" - rotate the whole cube clockwise by 90 degrees
	*  "<72" - rotate the whole cube counter clockwise by 72 degrees
	*  "+0.01" - crop faces by 0.01 (prevents visible edges)

	Example: `-u--,blfr,-d*2-->90+0.002`
	
	Please note that with cubemaps, seams can be visible due to texture filtering - this is most visible on horizontal and vertical crosses. It's best you fix them on pictures by duplicating a border into the unused part of the image. The 1% zoom with Facebook prevents this from happening.


= Commercial Use =

Please note, the BIVROST 360WebPlayer's free license allows only for non-commercial use. For commercial use you need to acquire a license, please see License for details.


== Installation ==

Add the BIVROST 360WebPlayer for WordPress plugin using the built-in plugin installer:

1. Download the plugin from [the releases page][download]
2. Go to `Plugins > Add New > Send plugin` and upload the zip file containing the plugin
3. Go to `Plugins > Installed` and enable the plugin

After installation, you will have a new button in the WYSYWIG editor. There is a also a `[bivrost-player]` shortcode available.

[download]: https://github.com/BIVROST/360WebPlayer-for-WordPress/releases

== Frequently Asked Questions == 

= Available keyboard shortcuts =

* ` ↑ ` ` → ` ` ↓ ` ` ← ` - look around.
* ` space ` - pause/play.
* ` F ` or double click player - full-screen.
* ` V ` - enter/toggle VR mode.
 ` escape ` - exit full-screen/VR mode.
* ` [ `, ` ] ` - scroll movie by 5 seconds, forwards or backwards.
* ` + `, ` - ` - zoom in/out (not available in VR mode).


= Virtual Reality on desktop and mobile with WebVR  =

At the time of writing, WebVR is supported by Microsoft Edge, [Firefox Nightly][webvr-firefox], special [Windows builds of Chromium][webvr-chromium] and [Chrome Canary][webvr-chrome-canary], Google Chrome on Android with Cardboard (after enabling WebVR in `chrome://flags/#enable-webvr`) and [Samsung Internet Browser for Gear VR][webvr-samsung].

When you have a supported platform, an headset button will be visible in 360WebPlayer - press it to enter VR.

For more platform specific instructions look at the [WebVR][webvr] website.

[webvr]: http://webvr.info/
[webvr-firefox]: https://github.com/Web-VR/iswebvrready/wiki/Instructions%3A-Firefox-Nightly
[webvr-chromium]: https://github.com/Web-VR/iswebvrready/wiki/Instructions%3A-Chromium
[webvr-chrome-canary]: https://webvr.info/get-chrome/
[webvr-chrome]: chrome://flags/#enable-webvr
[webvr-samsung]: https://github.com/Web-VR/iswebvrready/wiki/Instructions%3A-Samsung-Internet-Browser-for-Gear-VR-on-Android


= Virtual Reality on mobile with legacy Google Cardboard support =

You can use the Bivrost 360WebPlayer with Google Cardboard and its many clones with a simple split screen. Just press the "headset" button to go to VR mode.

Contrary to most players, you don't have to enable screen rotation for 360WebPlayer to work properly in cardboard mode. The phone can be in both landscape or portrait mode.

Press back or "x" button to exit VR mode.

Some tips:

* If you have a NFC tag in your Cardboard we advice you to disable NFC in your phone as it might run the cardboard app and turn off your browser.
* Not all phones have a gyroscope. If you have problems looking left and right, but up and down works, your phone does not have one. Instead your phone has a magnetometer, which does not work well with VR. Removing the magnet from the Cardboard improves the experience in this situation. Even if you have a gyroscope, many browsers ignore it (looking at you, recent Chrome). 
* Consider setting a longer time for screen timeout.
* If possible, use WebVR mode - it has far more accurate head movement and proper lens distortion.



= Video does not work =

Potential fixes:

1. Check if your device supports this kind of video by playing it directly in the browser. Some popular devices support only up to 1920x1080 resolution.

2. Videos or pictures have to be served from the same domain or provide [Cross-Origin Resource Sharing][cors] headers.

Some browsers do not support CORS well, for example Safari - for them you have to serve the content from the same subdomain, port and protocol as the HTML.

It is possible that with a CORS issue the audio will play, but the video will not. Check your web development console for details.

[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS



= Seeking does not work =

Either your webserver doesn't support [Content-Range][content-range] or there are issues with the video file. Some web servers do not have Content-Range support, for example the PHP built-in web server.

[content-range]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.16




= Where can I submit feature requests or bug reports? Where can I find the unminified version? =

Please send bugs and feature requests to our [GitHub project][issues]. The sources are located there too. Thanks a lot in advance for any and all feedback.

[issues]: http://github.com/BIVROST/360WebPlayer-for-WordPress



= Standalone players =

Although browsers are the most accessible platforms, they are not all fully ready for VR - that is why we created a whole family of video players.

The BIVROST 360WebPlayer has a button that allows online content to be run in a native player. This enhances performance and gives the user a better experience than viewing the content straight from the browser. If the user does not have the player yet, he or she can download it through a pop-up.

The [BIVROST 360Player for Windows][player-windows] standalone player for Windows supports Oculus, HTC Vive, OSVR and Windows Mixed Reality (via SteamVR) VR headsets, has less latency, and better frame rates.

We also have the BIVROST 360Player for Unity - a tool built on top of Unity that allows the user to create 360° video players for iOS, Android and GearVR.
Please [contact sales at contact@bivrost360.com][email-sales] for more details.




== License ==

This WordPress plugin is a wrapper and configuration tool for the BIVROST 360WebPlayer.

The 360WebPlayer has two license options:

1. [Free][license-free] - for non-commercial use
2. [Paid][license-paid] - for commercial use. We issue one license per domain ([contact us here][email-sales] for yours).

If you want to remove or replace our branding, are unsure about which license applies to you, please [contact us for help and additional licensing options][email-sales].

[email-sales]: mailto:contact@bivrost360.com
[license-free]: https://github.com/BIVROST/360WebPlayer/blob/master/LICENSE-free.md
[license-paid]: https://github.com/BIVROST/360WebPlayer/blob/master/LICENSE-commercial.md



== Screenshots ==

1. Installed player
2. Configuration panel


== Changelog ==

* 2016-04-15: Initial release 
* 2018-01-28: Updated to WordPress 4.9
* 2018-08-08: Move to GitHub, updated logo

== Upgrade Notice ==

No changes 


== Third party libraries ==

The BIVROST 360WebPlayer for WordPress uses third party libraries:

* [THREE.js][threejs] (MIT license)
* [hls.js][hlsjs] (Apache 2.0 License)
* [BIVROST 360 WebPlayer][github-360WebPlayer] (Custom open source license)

[threejs]: http://threejs.org
[hlsjs]: https://github.com/dailymotion/hls.js/
[github-360WebPlayer]: https://github.com/BIVROST/360WebPlayer