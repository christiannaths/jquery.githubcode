# jQuery.GithubCode

Show your code from any Github repo file or diff by simply dropping in an (almost) ordinary `<code>` tag into your HTML.

## Install

*dependencies:* [Rainbow](https://github.com/ccampbell/rainbow)

Include jquery, jquery.githubcode.js, along with Rainbow for highlighting.

```html
<link rel="stylesheet" type="text/css" href="stylesheets/rainbow/themes/twilight.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="javascripts/rainbow/rainbow.js"></script>
<script type="text/javascript" src="javascripts/jquery.githubcode.js"></script>
```

Fire the plugin on all classes of `<code class="github"></code>`

```javascript
$('code.github').githubcode();
```

## Usage

### Get one file:

```html
<code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js"></code>
```

### Get one file at a branch or tag:

```html
<code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js" data-ref="master"></code>
```

### Get the diff for one file at a specific commit:

```html
<code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js" data-ref="75176542c1ec7a26df39c5bc7c1ba306b842dedc"></code>
```

### Get diffs for all files at a specific commit:

```html
<code class="github" data-repo="christiannaths/jquery.githubcode" data-ref="75176542c1ec7a26df39c5bc7c1ba306b842dedc"></code>
```
