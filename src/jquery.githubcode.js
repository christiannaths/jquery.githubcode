;(function ( $, window, document, undefined ) {
  // A couple of utilites
    var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode: function(a) {
            var c, d, e, f, g, h, i, b = "", j = 0;
            for (a = Base64._utf8_encode(a); a.length > j; )
                c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = a.charCodeAt(j++), f = c >> 2, g = (3 & c) << 4 | d >> 4, h = (15 & d) << 2 | e >> 6, i = 63 & e, isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64), b = b + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h) + this._keyStr.charAt(i);
            return b
        },decode: function(a) {
            var c, d, e, f, g, h, i, b = "", j = 0;
            for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); a.length > j; )
                f = this._keyStr.indexOf(a.charAt(j++)), g = this._keyStr.indexOf(a.charAt(j++)), h = this._keyStr.indexOf(a.charAt(j++)), i = this._keyStr.indexOf(a.charAt(j++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, b += String.fromCharCode(c), 64 != h && (b += String.fromCharCode(d)), 64 != i && (b += String.fromCharCode(e));
            return b = Base64._utf8_decode(b)
        },_utf8_encode: function(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; a.length > c; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(192 | d >> 6), b += String.fromCharCode(128 | 63 & d)) : (b += String.fromCharCode(224 | d >> 12), b += String.fromCharCode(128 | 63 & d >> 6), b += String.fromCharCode(128 | 63 & d))
            }
            return b
        },_utf8_decode: function(a) {
            for (var b = "", c = 0, d = c1 = c2 = 0; a.length > c; )
                d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : d > 191 && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((31 & d) << 6 | 63 & c2), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3), c += 3);
            return b
        }};
    var Urlify = {parse: function(a) {
            var b = document.createElement("a");
            return b.href = a, b
        }};

  var pluginName, defaults;
  pluginName = "githubcode",
  defaults = {
    ref: 'master',
    access_token: 'f23b79399a2c6fbb411643ce79ad60029c853b97',
    request_host: "https://api.github.com/repos",
    beforeInsert: function(){},
    afterInsert: function(){}
  };

  var GithubCode = function ( element, options ) {
    var self = this;
    var $element = $(element);
    var request;

    this.options = $.extend({}, defaults, options);

    this.element = element;
    this.$element = $element;

    this._defaults = defaults;
    this._name = pluginName;

    this.url = this.$element.data('url');
    this.api = this.$element.data('api');

    this.init();
    request = this.githubRequest(this.api.request_url);
    request.done( this.options.beforeInsert );
    request.done( function(data){
      self.$inserted_elements = self.insert(data, $element, self);
    });
    request.done( function(data){
      self.options.afterInsert(self.$inserted_elements);
    });
    request.fail( function(request, msg) {
      $(element).replaceWith(
        $('<pre></pre>').text( request.status + " " + msg )
      );
    })
  }


  // Our constuctor function
  GithubCode.prototype = {
    init: function() {
      this.api = this.constructRequestUrl();
    },

    githubRequest: function(request_url){
      var request = new $.Deferred;;
      if( request_url) {
        request = $.get( request_url );
      } else {
        request.reject({status: "403 rejected:"}, "Cannot process this URL");
      };
      return request;
    },

    insert: function(data, $element, self){
      var $elements = $([]);
      var content = self.gatherContent(data, self);

      $.each(content.files, function(i, file){
        var $pre = $('<pre/>');
        var $code = $('<code/>');

        $pre = $pre.clone();
        $code = $code.clone();
        $code.text( file.content );
        $pre.addClass('language-'+ file.language);
        $pre.addClass('lang-'+ file.language);
        $pre.attr('data-language', file.language);
        $pre.attr('data-lang', file.language);
        $pre.append($code);
        $elements = $elements.add($pre);
        $element.before( $pre );
      });

      $element.remove();

      return $elements;
    },

    gatherContent: function(data, self){
      var output = { files: [] };
      var files = [];

      if( data.files ){
        files = data.files;
      } else {
        files.push(data);
      };

      $.map(files, function(file){
        tmp = {}
        tmp.filename = file.filename || file.path;
        tmp.content = file.patch || Base64.decode(file.content),
        tmp.language = self.detectLanguage(tmp.filename)
        if(self.api.path && self.api.path === tmp.filename){
          output.files.push(tmp);
        } else if(!self.api.path){
          output.files.push(tmp);
        }
      });

      return output;
    },

    detectLanguage: function(filename){
      var ext = filename.split('.').pop();
      var languages = {
        'js'      : 'javascript',
        'css'     : 'css',
        'sass'    : 'sass',
        'scss'    : 'scss',
        'html'    : 'markup',
        'htm '    : 'markup',
        'md'      : 'markup',
        'svg'     : 'markup',
        'coffee'  : 'coffeescript',
        'php'     : 'php'
      }

      return languages[ext];
    },

    constructRequestUrl: function(input){
      var params = {
        token: this.options.access_token,
        request_host: this.options.request_host,
        ref: this.options.ref,
        repo: this.options.repo,
        owner: this.options.owner,
      };

      if (this.url){
        params = this.parseUrlParams(this.url, params)
      } else if (this.api){
        params = this.parseApiParams(this.api, params)
      };

      if( params.method === "commit" && !params.path) {
        params.request_url = [params.request_host, params.owner, params.repo, "commits", params.ref].join('/') + "?access_token=" + params.token;
      } else if( params.path ) {
        params.request_url = [params.request_host, params.owner, params.repo, "contents", params.path].join('/') + "?ref=" + params.ref + "&access_token=" + params.token;
      } else {
        params.request_url = null
      };

      return params;

    },

    parseUrlParams: function(input, params){
      var url = Urlify.parse(input);
      var segments = url.pathname.split('/');
      params.host = url.host;
      params.full_path = url.pathname;

      if( params.host === 'raw.github.com' ){
        params.owner = segments[1];
        params.repo = segments[2];
        params.ref = segments[3];
        params.path = segments.slice(4, segments.length).join('/');
      } else {
        params.owner = segments[1];
        params.repo = segments[2];
        params.method = segments[3];
        params.ref = segments[4];
        params.path = segments.slice(5, segments.length).join('/') || null;
      };

      return params;
    },

    parseApiParams: function(input, params) {
      input = input.replace(/\s+/g, '');
      input = input.split(',');
      $.each(input, function(i, param){
        param = param.split(':');
        params[param[0]] = param[1];
      });
      params.ref = params.commit || params.tag || params.ref || this.options.ref;
      if("commit" in params) params.method = "commit";

      console.log(params)

      return params;
    }
  };

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new GithubCode( this, options ));
      }
    });
  };


})( jQuery, window, document );
