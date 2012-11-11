# jQuery.GithubCode

Show your code from any Github repo file or diff by simply dropping in an (almost) ordinary &lt;code> tag into your HTML.

## Install

*dependencies:* [Rainbow](https://github.com/ccampbell/rainbow)

Include jquery, jquery.githubcode.js, along with Rainbow for highlighting.

```html
&lt;link rel="stylesheet" type="text/css" href="stylesheets/rainbow/themes/twilight.css" />

&lt;script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">&lt;/script>
&lt;script type="text/javascript" src="javascripts/rainbow/rainbow.js">&lt;/script>
&lt;script type="text/javascript" src="javascripts/jquery.githubcode.js">&lt;/script>
```

Fire the plugin on all classes of `&lt;code class="github">&lt;/code>

```javascript
&lt;script type="text/javascript">
    $('code.github').githubcode();
&lt;/script>
```

## Usage

### Get one file:

```html
&lt;code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js">&lt;/code>
```
    
### Get one file at a branch or tag:

```html
&lt;code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js" data-ref="master">&lt;/code>
```

### Get the diff for one file at a specific commit:

```html
&lt;code class="github" data-repo="christiannaths/jquery.githubcode" data-path="jquery.githubcode.js" data-ref="75176542c1ec7a26df39c5bc7c1ba306b842dedc">&lt;/code>
```

### Get diffs for all files at a specific commit:

```html
&lt;code class="github" data-repo="christiannaths/jquery.githubcode" data-ref="75176542c1ec7a26df39c5bc7c1ba306b842dedc">&lt;/code>
```