/*!
 * jQuery Github Code
 * Author: @christiannaths
 * URL: christiannaths.com
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

  $.fn.githubcode = function ( options ) {

    options = $.extend( {}, $.fn.githubcode.options, options );

    return this.each(function () {
      var $this = $(this);

      // Fallback to options in data- attributes
      // store all merged options in data object
      $.extend( $this.data(), options )



      var hasPath = typeof $this.data('path') !== 'undefined';
      var hasRef = typeof $this.data('ref') !== 'undefined';
      var sha1Test = /^[0-9a-f]{40}$/i;
      var refIsHash = sha1Test.test($this.data('ref'));

      var isFullCommit = !hasPath && hasRef && refIsHash;
      var isSingleFileCommit = hasPath && hasRef && refIsHash;
      var isSingleFileHEAD = hasPath && !refIsHash;


      // Main logic block, deterine which calls to make
      // to the Github API.
      if ( !hasPath && hasRef && refIsHash ) {
        // get diffs for all files for a single commit
        $this.getCommitDiffs();

      } else if (hasPath && hasRef && refIsHash) {
        // getting diff of single file for a single commit
        $this.getCommitDiffs( $this.data('path') );

      } else if (hasPath && !refIsHash) {
        // get all code for a single file on a specified branch
        $this.getFile();

      };



    });
  };

    // Globally overriding options
    // Here are our publicly accessible default plugin options
    // that are available in case the user doesn't pass in all
    // of the values expected. The user is given a default
    // experience but can also override the values as necessary.
    // eg. $fn.githubcode.key ='otherval';

    $.fn.githubcode.options = {
      'api': 'https://api.github.com/repos',
      'debug': false,
      afterInsert: function() {},
      highlight: function(){
        var $this = this;

        var options = $this.data();
        var block = $this.text();

        // Diffs need to be parsed differently than
        // regular fetched files
        //
        // this should be broken up into more modular
        // parts, and probably moved so it isn't an
        // options method.
        var diffHunkRegex = /^\@\@\s\-(\d+)\,\d+\s\+(\d+)\,\d+\s\@\@/;
        var removedLineRegex = /^\-/;
        var addedLineRegex = /^\+/;
        var $section = $('<code/>');

        var linesAddedCounter = 0;
        var linesRemovedCounter = 0;

        var lines = block.split('\n');
        var diffMatcher = [];


        var codelines = $.map(lines, function(line, index) {
          var codeline = new Object();
          var offset = line.match(diffHunkRegex);
          var removedLine = removedLineRegex.test(line);
          var addedLine = addedLineRegex.test(line);

          if (offset) {
            linesRemovedCounter = offset[1] - 1;
            linesAddedCounter = offset[2] - 1;

            codeline.text = ''
            codeline.state = 'continue';
            codeline.number = null;

          } else if ( removedLine ){
            linesRemovedCounter ++;

            codeline.text = ' '+ line.match(/^\-(.*)/)[1]
            codeline.state = 'removed';
            codeline.number = linesRemovedCounter;

          } else if ( addedLine ) {
            linesAddedCounter++;

            codeline.text = ' '+ line.match(/^\+(.*)/)[1]
            codeline.number = linesAddedCounter;
            codeline.state = 'added';

          } else {
            linesAddedCounter++;
            linesRemovedCounter++;

            codeline.text = line;
            codeline.number = linesAddedCounter;
            codeline.state = 'stale';
          };

          return codeline;
        });


        codeblock = $.map(codelines, function(codeline, i){
          return codeline.text;
        }).join("\n");


        if (typeof Rainbow !== 'undefined' ) {
          var highlighted = Rainbow.color(codeblock, options.language, function(highlighted_block) {

            var highlighted_lines = highlighted_block.split("\n");
            wrapped_lines = $.map(highlighted_lines, function(line, i){

              var wrapped_line =
                "<span class='line "+ codelines[i].state +"' style='counter-reset: linenumber "+ (codelines[i].number - 1) +";'>" +
                  line +
                "</span>";

              return wrapped_line;
            });

            $section.html(wrapped_lines.join("\n"));
            $this.replaceWith($section);

          });
        }




      }
    };

    $.fn.extend({
      getCommitDiffs: function( solo_file ) {
        var $target = this;
        var $this = this;
        var method = 'commits';
        var options = this.data();


        var request_url = [options.api, options.repo, method, options.ref].join('/');

        $.ajax({
          'url':      request_url,
          'type':     'GET',
          'headers':  { 'Accept': 'application/vnd.github.v3.raw' },
          'success':  function(response){
            var files = $this.filter(response.files, solo_file);

            $.each( files, function(index, file){

              // TODO:
              // go through each codeline and remove DIFF @@ -29,7 +29,7 @@ lines
              // use the values there to determine counter offset and
              // section counter reset. Probably should create a new
              // section for each one, maybe span.numbered or something.

              $this.data('path', file.filename)

              var codelines = file.patch.split("\n")
              // var offset = codelines.splice(0, 1)[0].match(/ \+(\d+)/)[1] || 0
              var lang = $this.detectLanguage();
              var code = codelines.join('\n')


              var $pre_tag = $('<pre/>');
              var $code_tag = $target.clone();
              var $title_tag = $('<p/>').addClass('github-filename');

              $title_tag.text(file.filename);
              $title_tag.insertBefore($target);

              // $code_tag.attr('data-linenumber', parseInt(offset));
              $code_tag.attr('id', null)
              $code_tag.attr('data-language', lang);
              $code_tag.attr('data-lang', lang);
              $code_tag.addClass('language-'+ lang);
              $code_tag.addClass('lang-'+ lang);
              $code_tag.text(code);

              $pre_tag.append($code_tag);
              $pre_tag.insertBefore($target);

              options.highlight.call($code_tag);

            });

            $target.remove();
            // options.afterInsert.call(this);

          }
        });


      },

      getFile: function(){
        var $target = this;
        var $this = this;
        var method = 'contents';
        var options = this.data();

        var request_url = [options.api, options.repo, method, options.path].join('/') + "?ref=" + (options.ref || 'master');

        $.ajax({
          'url':      request_url,
          'type':     'GET',
          'headers':  { 'Accept': 'application/vnd.github.v3.raw' },
          'success':  function(response){

            var code = response;
            var lang = $this.detectLanguage();
            var offset = 0;

            var $pre_tag = $('<pre/>');
            var $code_tag = $target.clone();
            var $title_tag = $('<p/>').addClass('github-filename');

            $title_tag.text(options.path);
            $title_tag.insertBefore($target);

            $code_tag.attr('data-linenumber', parseInt(offset));
            $code_tag.attr('id', null)
            $code_tag.attr('data-language', lang);
            $code_tag.attr('data-lang', lang);
            $code_tag.addClass('language-'+ lang);
            $code_tag.addClass('lang-'+ lang);
            $code_tag.text(code);

            $pre_tag.append($code_tag);
            $pre_tag.insertBefore($target);

            options.highlight.call($pre_tag.find('code'));

            $target.remove();
            // options.afterInsert.call(this);

          }

        });
      },

      detectLanguage: function(){
        var file = this.data('path') || '';
        var file_ext = file.split('.').pop() || '';
        var lang = this.data('language') || this.data('lang');

        if (typeof lang === 'undefined'){
          switch(file_ext) {
            case "js":
              lang = "javascript";
              break;
            case "java":
              lang = "java";
              break;
            case "css":
              lang = "css";
              break;
            case "html":
              lang = "html";
              break;
            default:
              lang = "generic";
          };
        };

        return lang;
      },

      filter: function( files, solo_file ){
        if (typeof solo_file !== 'undefined'){
          files = files.filter(function (el) {
            return el.filename === solo_file;
          });
        };

        return files;
      }

    });


})( jQuery, window, document );
