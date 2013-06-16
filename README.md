# jQuery.GithubCode

Show your code from any Github repo file or diff by simply dropping in an (almost) ordinary `<code>` tag into your HTML.

~~Check out the [demo]()~~

*__Note:__ This is a very early release (probably too early), and there are a few known bugs I'm currently working on. Feel free to file an issue for any bugs you find or feature requests you might have.*

## Install

*dependencies:*

+ [jQuery](http://jquery.com)


Include jquery & jquery.githubcode
```html

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.sitepress.cc.s3.amazonaws.com/libs/jquery.githubcode/jquery.githubcode.js"></script>
```

Fire the plugin on all classes of `<code class="githubcode"></code>`

```javascript
$('code.githubcode').githubcode();
```

## Usage

Add a ```<code>``` tag to your markup, add Github URL via data-url attribute.
```html

<code class="githubcode" data-url="https://github.com/christiannaths/jquery.githubcode/blob/master/src/jquery.githubcode.js"
