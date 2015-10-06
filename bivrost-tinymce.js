/* global tinymce, wp */

(function() {
	
	// media selector
	function get_media(on_got_media) {
		// TODO: add preselected
		var custom_uploader = (wp.media({
			title: 'Select movie and alt sources',
			button: {
				text: 'OK'
			},
			multiple: true
		})
		.on('select', function() {
			var selection=custom_uploader.state().get('selection');
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

		var defaults={
			loop: false,
			autoplay: false,
			source: "autodetect",
			stereoscopy: "autodetect",
			projection: "equirectangular",
			theme: "default",
			width: "",
			height: ""
		};
		
		// http://stackoverflow.com/questions/24871792/tinymce-api-v4-windowmanager-open-what-widgets-can-i-configure-for-the-body-op

		var id="placeholder-"+(+new Date());

		var srcs=(shortcode.content || "").replace(/<[^>]+>/g, " ").split(/\s+/).map(function(s) { return s.trim(); }).filter(function(s) { return s !== ""; });

		var values=shortcode.attrs.named;
		var available_projections=["equirectangular", "cubemap:horizontal", "cubemap:two-by-three", "cubemap:horizontal-cross", "cubemap:vertical-cross"];
		if(values.projection && available_projections.indexOf(values.projection) === -1 && /^cubemap:.+/.test(values.projection))	// custom cubemap projection - add it to list
			available_projections.push(values.projection);

		window.win=tinyMCE.activeEditor.windowManager.open( {
			title: 'BIVROST 360WebPlayer configuration',
			body: [
				checkbox_helper("loop", "Should the movie loop?", !!JSON.parse(values.loop || JSON.stringify(defaults.loop))),
				checkbox_helper("autoplay", "Should the movie play on load?", !!JSON.parse(values.autoplay || JSON.stringify(defaults.autoplay))),
				listbox_helper("source", "Source type", values.source || defaults.source, ["autodetect", "video", "picture"]),
				listbox_helper("stereoscopy", "Stereoscopy type", values.stereoscopy || defaults.stereoscopy, ["autodetect", "mono", "side-by-side", "top-and-bottom", "top-and-bottom-reversed"]),
				listbox_helper("projection", "Projection type", values.projection || defaults.projection, available_projections),
				listbox_helper("theme", "Theme", values.theme || "default", ["default", "spring", "autumn", "turquoise", "winter"]),
				{
					type: "textbox",
					name: "width",
					label: "Widget width in css units (px, %, etc),\n leave empty for default",
					value: values.width || ""
				},
				{
					type: "textbox",
					name: "height",
					label: "Widget height in css units (px, %, etc),\n leave empty for default",
					value: values.height || ""
				},
				{
					type: "container",
					label: "sources",
					html:  "<div id=\""+id+"\"></div>",
					minHeight: 150
				},
				{	
					type: "button",
					text: "add source",
					classes: "add-button"
				}
			],
			onsubmit: function(values) {
				for(var key in values.data)
					if(values.data.hasOwnProperty(key)) {
						var val=values.data[key];
						delete shortcode.attrs.named[key];
						if(defaults[key] !== val)
							shortcode.attrs.named[key]=values.data[key];
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
				? "360 video or picture sources:"
				: "No 360 video or picture sources found. Add them using the 'add source' button"
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
			
			// 
			srcs.forEach(function(src) {
				var li=document.createElement("li");
				
				var span=document.createElement("span");
				span.style.verticalAlign="middle";
				span.style.lineHeight="30px";
				span.appendChild(document.createTextNode(" • "+src.split("/").pop()));
				span.className="mce-container";
				
				var remove=document.createElement("button");
				remove.appendChild(document.createTextNode("remove"));
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

		reset_srcs(media);
	}
	
	
	var url_;
	
	// shortcode preview
	wp.mce.views.register('bivrost-player', _.extend({}, {
		
		state: [],

		shortcode: "bivrost-player",

		initialize: function() {
			this.render("<img src=\""+url_+"/preview.png\">");
		},
		
		edit: function(text, update) {
			var shortcode=this.shortcode;
			shortcode_editor(shortcode, function() { update(shortcode.string()); } );
		}
		
	}));
	
	
	// tinymce button
	tinymce.create("tinymce.plugins.bivrost", {
		init: function(editor, url) {
			url_=url;
			editor.addButton("bivrost_button", {
				title: "BIVROST 360WebPlayer",
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
