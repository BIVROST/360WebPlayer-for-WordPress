/* global tinymce */

// closure to avoid namespace collision
(function(){
	
	var url_;
	
//	function do_spot(co) {
//		return co.replace(/\[bivrost([^\]]*)\]/g, function(a,b) {
//			return '<img src="'+url_+'/preview.png" class="wpSpot mceItem" title="bivrost'+tinymce.DOM.encode(b)+'" />';
//		});
//	};
//
//	function get_spot(co) {
//
//		function getAttr(s, n) {
//			n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);
//			return n ? tinymce.DOM.decode(n[1]) : '';
//		};
//
//		return co.replace(/(?:<p[^>]*>)*(<img[^>]+>)(?:<\/p>)*/g, function(a,im) {
//			var cls = getAttr(im, 'class');
//
//			if ( cls.indexOf('wpSpot') !== -1 )
//				return '<p>['+tinymce.trim(getAttr(im, 'title'))+']</p>';
//
//			return a;
//		});
//	};

	
	tinymce.create('tinymce.plugins.bivrost', {
		init: function(editor, url) {
			url_=url;
			editor.addButton('bivrost_button', {
				title : 'BIVROST 360WebPlayer', // title of the button
				image: url+'/bivrost-20x20.png',
				onclick: function() {
//					var win=window.open(url+"/popup.html", "_blank", "width=800, height=600, toolbar=no, scrollbars=no, resizable=yes");
					window.mce=tinyMCE.activeEditor;	//.execCommand('mceInsertContent', 0, shortcode)

					tb_show('BIVROST 360WebPlayer', url+"/popup.html");
				}
			});
			
			
			editor.onBeforeSetContent.add(function(ed, o) {
				o.content = do_spot(o.content);
			});
			
			//replace shortcode as its inserted into editor (which uses the exec command)
			editor.onExecCommand.add(function(ed, cmd) {
			    if (cmd ==='mceInsertContent'){
					tinyMCE.activeEditor.setContent( do_spot(tinyMCE.activeEditor.getContent()) );
				}
			});
			//replace the image back to shortcode on save
			editor.onPostProcess.add(function(ed, o) {
				if (o.get)
					o.content = get_spot(o.content);
			});
		},
		createControl: function(n, cm) {
			return null;
		},
		getInfo: function() {
			return {
				longname: 'BIVROST 360WebPlayer for WordPress',
				author: 'Bivrost',
				authorurl: 'http://bivrost360.com/',
				infourl: 'http://bivrost360.com/',
				version: '1.0'
			};
		},

		
	});
	tinymce.PluginManager.add('bivrost', tinymce.plugins.bivrost);
	
})();





