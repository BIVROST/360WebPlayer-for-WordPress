#!/usr/bin/env php
<?php

$text = file_get_contents('readme.txt');
$text = preg_replace_callback("/== Screenshots ==([^=]+)==/s", function($f) { return "=="; }, $text);
$text = preg_replace_callback("/(.+)(== Description ==)/s", function($f) { return ""; }, $text);
$text = preg_replace("/=== (.+) ===/", "# \\1", $text);
$text = preg_replace("/== (.+) ==/", "## \\1", $text);
$text = preg_replace("/= (.+) =/", "### \\1", $text);

$title = <<<END
BIVROST 360WebPlayer for WordPress 
==================================


END;

file_put_contents('readme.md', $title . $text);
