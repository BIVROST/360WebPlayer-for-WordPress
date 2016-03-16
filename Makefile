.PHONY: docs
docs: wordpress.html codecanyon.html

wordpress.html: readme.txt screenshot-* Makefile
		# echo '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>BIVROST 360WebPlayer for WordPress</title></head><body>' >wordpress.html
		bash -c 'curl -F text=1 -F "readme_contents=$$(cat readme.txt)" https://wordpress.org/plugins/about/validator/' \
		 | awk '																												\
				$$0 ~ "<h1>" { p=1 }																						\
				$$0 ~ "re-edit" {p=0 }																					\
				$$0 ~ "<hr" { ss=0 }																						\
				$$0 ~ "Screenshots" { ss=1 }																			\
				(p && ss) {																									\
					out="<img src=\"screenshot-" ss ".png\" alt=\"\" /><p class=\"figure\">";			\
					if(sub(/<p>/, out, $$0)) ss=ss+1;																\
					print $$0;																								\
				}																												\
				(p && !ss) { print }																						\
		 '																														\
		 > wordpress.html
		# echo '</body></html>' >>wordpress.html
		pandoc wordpress.html --to=html5 --self-contained  -o wordpress.html

codecanyon.html: screenshot-* codecanyon-readme/* Makefile
		pandoc --self-contained -f markdown codecanyon-readme/codecanyon-readme.md --to=html5 -o codecanyon.html
