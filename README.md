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



## Usage

Add a ```<code>``` tag to your markup, add Github URL via data-url attribute.
```html

<code class="githubcode" data-url="https://github.com/christiannaths/jquery.githubcode/blob/master/src/jquery.githubcode.js"</code>
```

Fire the plugin on all classes of `<code class="githubcode"></code>`

```javascript

$('code.githubcode').githubcode();
```

Fire the plugin when the DOM is ready

```html

<script type="text/javascript">
  $('code.githubcode').githubcode();
</script>
```


## Example

You probably want to do some sytnax highlighting. (This example uses [Prism](http://prismjs.com/))
```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>GithubCode Example</title>
  <link rel="stylesheet" type="text/css" href="./stylesheets/prism.css" />
</head>
<body>

  <h1>Get A Single File via GH Raw URL</h1>
  <code class="githubcode" data-url="https://github.com/christiannaths/jquery.githubcode/blob/master/src/jquery.githubcode.js"</code>

  <script src="./javascripts/jquery.min.js"></script>
  <script src="./javascripts/prism.js"></script>
  <script src="./javascripts/jquery.githubcode.min.js"></script>
  <script type="text/javascript">
    $('.githubcode').githubcode({
      afterInsert: function($element){
        Prism.highlightAll();
      }
    });
  </script>
</body>
</html>
```
