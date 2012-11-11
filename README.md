# jQuery.GithubCode

Show your code from any Github repo file or diff by simply dropping in an (almost) ordinary `<code>` tag into your HTML.

Check out the [demo](http://cdn.sitepress.cc.s3.amazonaws.com/libs/jquery.githubcode/example.html)

## Install

*dependencies:*

+ [jQuery](http://jquery.com)
+ [Rainbow](https://github.com/ccampbell/rainbow)

Include dependencies. *see the Rainbow readme for instructions on how to use Rainbow.*

```html
<link rel="stylesheet" type="text/css" href="stylesheets/rainbow/themes/twilight.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="javascripts/rainbow/rainbow.js"></script>
<script type="text/javascript" src="javascripts/rainbow/language/html.js"></script>
<script type="text/javascript" src="javascripts/rainbow/language/css.js"></script>
<script type="text/javascript" src="javascripts/rainbow/language/javascript.js"></script>
```

Include jquery.githubcode

```html
<script type="text/javascript" src="http://cdn.sitepress.cc.s3.amazonaws.com/libs/jquery.githubcode/jquery.githubcode.js"></script>
```

Fire the plugin on all classes of `<code class="github"></code>`

```javascript
$('code.github').githubcode();
```

## Usage

Add a ```<code>``` tag to your markup, sprinkle in ```data-repo=":owner/:repo"```, ```data-path=":path"```, and ```data-ref=":ref"``` as you see fit.

### Parameters

```data-repo``` *Mandatory string - the Github repository to be used; in the form of :owner/:repo, where :owner is the Github username, and :repo is the name of the Github repository.*

```data-path``` *Optional string - The content path.*

```data-ref``` *Optional string - The String name of the Commit/Branch/Tag. Defaults to master.*


## Examples

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
