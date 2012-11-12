do ($ = jQuery, window) ->


  # Our main executable
  # Accepts an options hash, and executes functions
  # to get code snippets from the Github API, highlight
  # that code, and inject it back into the DOM.
  $.fn.githubcode = ( options ) ->

    options = $.extend( {}, $.fn.githubcode.options, options )


    this.each ->
      $this = $(this)
      $.extend $this.data(), options

      step1 = fetchCode( $this )

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
  fetchCode = ( $this ) ->
    # Should return an array of code tags, containing
    # the unaltered code from the requested file.

    codeblocks = new Array()
    deferred = new $.Deferred()
    api = $this.data('api')
    repo = $this.data('repo')
    path = $this.data('path')
    ref = $this.data('ref')

    # console.log repo, path, ref





    repoExists= repo?
    pathExists = path?
    refExists = ref?
    sha1Test = /^[0-9a-f]{40}$/i;
    refIsHash = sha1Test.test(ref);

    #  !hasPath && hasRef && refIsHash
    if repoExists and refIsHash
      method = 'commits'
      request_url = [api, repo, method, ref].join('/')
      data_type = 'json' if $this.data('debug') is true
      request_url = "test/data/diffs.json" if $this.data('debug') is true

    else if repoExists and pathExists and not refIsHash
      method = 'contents'
      request_url = [api, repo, method, path].join('/') + "?ref=#{ ref or 'master' }"
      data_type = 'html' if $this.data('debug') is true
      request_url = "test/data/single.html" if $this.data('debug') is true

    else
      console.error("Options provided were not sufficient to make the request. Aborting.")
      # fail the deferred here?

    # console.log request_url




    $.ajax
      url: request_url,
      type: 'GET',
      dataType: data_type,
      headers: { 'Accept': 'application/vnd.github.v3.raw' },
      success: (response) ->

        if typeof response is 'object'
          $.each response.files, (i, file) ->
            codeblocks.push file.patch
        else
          codeblocks.push response

        deferred.resolve(codeblocks)


    return deferred

    # dfd.promise()

  highlightCode = ( codeblocks )->
    # Should return an array of code tags, containing
    # the sytnax highlighted, line-wrapped code from
    # the requested file.

    $.each codeblocks, (i, codeblock) ->

      console.log codeblock

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


