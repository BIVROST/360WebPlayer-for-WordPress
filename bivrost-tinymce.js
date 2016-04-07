/* global tinymce, wp, tinyMCE */

"use strict";

(function() {

	// default values for attributes
	var defaults={
		loop: false,
		autoplay: true,
		source: "autodetect",
		stereoscopy: "autodetect",
		projection: "equirectangular",
		theme: "default",
		width: "",
		height: ""
	};

	var __=function(key) {
		return tinymce.activeEditor.getLang("bivrost-360webplayer."+key);
	};
	
	// media selector
	function get_media(on_got_media) {
		// TODO: add preselected
		var custom_uploader = (wp.media({
			title: __("custom_uploader_select_files"),
			button: {
				text: "OK"
			},
			multiple: true
		})
		.on("select", function() {
			var selection=custom_uploader.state().get("selection");
			on_got_media(selection.models);
		})
		.open());
	}
	
	
	
	
	function shortcode_editor(shortcode, on_submit) {
		
		function listbox_helper(name, label, value, values) {
			return {
				type: "listbox",
				name: name,
				label: label,
				value: value,
				values: values.map(function(v) { return { text: v, value: v }; })
			};
		};
		
		function checkbox_helper(name, label, value) {
			return {
				type: "checkbox",
				name: name,
				label: label,
				checked: value,
				text: ""
			};
		};
		
		var id="placeholder-"+(+new Date());

		var srcs=(shortcode.content || "").replace(/<[^>]+>/g, " ").split(/\s+/).map(function(s) { return s.trim(); }).filter(function(s) { return s !== ""; });

		var values=shortcode.attrs.named;
		var available_projections=["equirectangular", "cubemap:horizontal", "cubemap:two-by-three", "cubemap:horizontal-cross", "cubemap:vertical-cross"];
		if(values.projection && available_projections.indexOf(values.projection) === -1 && /^cubemap:.+/.test(values.projection))	// custom cubemap projection - add it to list
			available_projections.push(values.projection);

		// http://stackoverflow.com/questions/24871792/tinymce-api-v4-windowmanager-open-what-widgets-can-i-configure-for-the-body-op
		tinyMCE.activeEditor.windowManager.open( {
			title: __("title_360webplayer_configuration"),
			body: [
				checkbox_helper("loop", __("label_loop"), !!JSON.parse(values.loop || JSON.stringify(defaults.loop))),
				checkbox_helper("autoplay", __("label_autoplay"), !!JSON.parse(values.autoplay || JSON.stringify(defaults.autoplay))),
				listbox_helper("source", __("label_source"), values.source || defaults.source, ["autodetect", "video", "picture", "stream-hls"]),
				listbox_helper("stereoscopy", __("label_stereoscopy"), values.stereoscopy || defaults.stereoscopy, ["autodetect", "mono", "side-by-side", "top-and-bottom", "top-and-bottom-reversed"]),
				listbox_helper("projection", __("label_projection"), values.projection || defaults.projection, available_projections),
				listbox_helper("theme", __("label_theme"), values.theme || defaults.theme, ["default", "spring", "autumn"]),
				{
					type: "textbox",
					name: "width",
					label: __("label_width"),
					value: values.width || defaults.width
				},
				{
					type: "textbox",
					name: "height",
					label: __("label_height"),
					value: values.height || defaults.height
				},
				{
					type: "container",
					label: "sources",
					html:  "<div id=\""+id+"\"></div>",
					minHeight: 150
				},
				{	
					type: "button",
					text: __("button_add_gallery"),
					classes: "add-button"
				},
				{	
					type: "button",
					text: __("button_add_url"),
					classes: "add-url-button"
				}
			],
			onsubmit: function(values) {
				for(var key in values.data)
					if(values.data.hasOwnProperty(key)) {
						var val=values.data[key];
						delete shortcode.attrs.named[key];
						if(defaults[key] !== val) {
							shortcode.attrs.named[key]=values.data[key];
						}
					}
				
				shortcode.content="\n"+srcs.join("<br/>\n")+"\n";
				on_submit();
			}
		} );

		// modify container
		var media=document.getElementById(id);
//		while(!(/mce-formitem/.test(media.className)))
			media=media.parentNode.parentNode.parentNode.parentNode;
		
		
		function reset_srcs() {
			media.innerHTML="<p>"+ (srcs.length 
				? __("sources_list")
				: __("sources_empty")
			)+"</p>\n";
			var ul=document.createElement("ul");
			media.appendChild(ul);
			media.style.overflow="auto";
			
			// unique
			var usedSrc={};
			srcs=srcs.filter(function(src) {
				if(usedSrc[src])
					return false;
				usedSrc[src]=true;
				return true;
			});
			
			// add labels and remove buttons
			srcs.forEach(function(src) {
				var li=document.createElement("li");
				
				var span=document.createElement("span");
				span.style.verticalAlign="middle";
				span.style.lineHeight="30px";
				span.appendChild(document.createTextNode(" • "+src.split("/").pop()));
				span.className="mce-container";
				
				var remove=document.createElement("button");
				remove.appendChild(document.createTextNode(__("button_remove")));
				remove.addEventListener("click", function() {
					srcs=srcs.filter(function(s) { return s !== src; } );
					reset_srcs();
				});

				var removeHolder=document.createElement("span");
				removeHolder.className="mce-btn";
				removeHolder.style.float="right";
				removeHolder.appendChild(remove);
				
				li.appendChild(removeHolder);
				li.appendChild(span);
				li.style.break="both";
				li.style.marginTop="0.5em";
				
				ul.appendChild(li);
			});
			
		}
		
		var button=media.parentNode.parentNode.querySelector(".mce-add-button button");		
		button.addEventListener("click", function() {
			get_media(function(m) {
				m.forEach(function(mm) {
					srcs.push(mm.attributes.url);
				});
				reset_srcs();
			});
		});
		
		var buttonUrl=media.parentNode.parentNode.querySelector(".mce-add-url-button button");		
		buttonUrl.addEventListener("click", function() {
			var url=prompt(__("prompt_url"), "");
			if(url)
				srcs.push(url);
			reset_srcs();
		});

		reset_srcs(media);
	}
	
	
	var plugin_url;
	
	// shortcode preview
	wp.mce.views.register('bivrost-player', _.extend({}, {
		
		state: [],

		shortcode: "bivrost-player",

		initialize: function() {
			this.render("<img src=\""+plugin_url+"/preview.png\">");
		},
		
		edit: function(text, update) {
			var shortcode=this.shortcode;
			shortcode_editor(shortcode, function() { update(shortcode.string()); } );
		}
		
	}));
	
	
	// tinymce button
	tinymce.create("tinymce.plugins.bivrost", {
		init: function(editor, url) {
			plugin_url=url;
			editor.addButton("bivrost_button", {
				title: __("button_add_360webplayer"),
				image: url+"/bivrost-button.png",
				onclick: function() {
					var shortcode=new wp.shortcode({tag: "bivrost-player"});
					shortcode_editor(shortcode, function() { editor.insertContent(shortcode.string()); }); 
				}
			});
		}
	});
	tinymce.PluginManager.add("bivrost", tinymce.plugins.bivrost);
})();
