do ($ = jQuery, window) ->


  # Our main executable
  # Accepts an options hash, and executes functions
  # to get code snippets from the Github API, highlight
  # that code, and inject it back into the DOM.
  $.fn.githubcode = ( options ) ->

    options = $.extend( {}, $.fn.githubcode.options, options )

    this.each ->
      $this = $(this)


      step1 = fetchCode()

      step2 = step1.pipe (msg) ->
        highlightCode(msg)

      step3 = step2.pipe (msg) ->
        insertCode(msg)

      # step3.done (msg) ->



  # Globally overriding options
  # Here are our publicly accessible default plugin options
  # that are available in case the user doesn't pass in all
  # of the values expected. The user is given a default
  # experience but can also override the values as necessary.
  # eg. $fn.githubcode.key ='otherval';
  $.fn.githubcode.options =
    'api': 'https://api.github.com/repos',
    'debug': false,
    afterInsert: ->


  # Our utility functions
  # $.fn.extend
  fetchCode = ( repo, path, ref ) ->
    # Should return an array of code tags, containing
    # the unaltered code from the requested file.
    #
    # Example of a custom deferred object
    # var dfr = $.Deferred();
    #     $.ajax({
    #      url:"http://search.twitter.com/search.json",
    #      data:{q:query},
    #      dataType:'jsonp',
    #      success:dfr.resolve
    #     });
    #     return dfr.promise();

    dfd = $.Deferred()

    setTimeout ->
      console.log "start", 'fetched'
      dfd.resolve('fetched')
    ,
    1000

    dfd

    # dfd.promise()

  highlightCode = ( codeblocks )->
    # Should return an array of code tags, containing
    # the sytnax highlighted, line-wrapped code from
    # the requested file.

    dfd = $.Deferred()

    setTimeout ->
      console.log "retrieved from #{ codeblocks }", 'highlighted'
      dfd.resolve('highlighted')
    ,
    1000

    dfd

  insertCode = ( codeblocks, $target )->
    # Returns nothing, injects each code tag into
    # the DOM, wrapped in a pre tag, before the
    # original code tag.
    dfd = $.Deferred()

    setTimeout ->
      console.log "retrieved from #{ codeblocks }", 'injected'
      dfd.resolve('injected')
    ,
    1000

    dfd


