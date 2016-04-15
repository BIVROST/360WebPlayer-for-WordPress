.PHONY: docs
docs: wordpress.html codecanyon.html

wordpress.html: readme.txt screenshot-* Makefile
		echo '<!DOCTYPE html><html><head><title>Bivrost 360WebPlayer for WordPress</title><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cerulean/bootstrap.min.css" rel="stylesheet" /><style type="text/css">	body { padding-bottom: 2em; } </style></head><body>' >wordpress.html
		bash -c 'curl -F text=1 -F "readme_contents=$$(cat readme.txt)" https://wordpress.org/plugins/about/validator/' 	\
		 | awk '																											\
				BEGIN { p=0; ss = 0 }																								\
				$$0 ~ "<h1>" { p=1 }																						\
				$$0 ~ "re-edit" {p=0 }																						\
				$$0 ~ "<hr" { ss=0 }																						\
				$$0 ~ "Screenshots" { ss=1 }																				\
				(p && ss) {																									\
					out="<img src=\"screenshot-" ss ".png\" alt=\"\" /><p class=\"figure\">";								\
					if(sub(/<p>/, out, $$0)) ss=ss+1;																		\
					print $$0;																								\
				}																											\
				(p && !ss) { print }																						\
		 '																													\
		 >> wordpress.html
		echo '</body></html>' >>wordpress.html
		# pandoc wordpress.html --to=html5 --self-contained  -o wordpress.html

codecanyon.html: screenshot-* codecanyon-readme/* Makefile
		pandoc --self-contained -f markdown codecanyon-readme/codecanyon-readme.md --to=html5 -o codecanyon.html

lang/bivrost-360webplayer.pot: locale.php
	echo "Updating POT file..."
	xgettext -L PHP -o lang/360webplayer.pot -j -k__ -k_e locale.php

lang/bivrost-360webplayer-pl_PL.mo: bivrost-lang/360webplayer-pl_PL.po
	msgfmt lang/bivrost-360webplayer-pl_PL.po -o bivrost-lang/360webplayer-pl_PL.mo
