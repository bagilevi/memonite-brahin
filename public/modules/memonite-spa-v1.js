// SPA as in Single-Page-Application
//
// This module here makes sure that we don't need to load a new page and initialize
// a new editor, when we navigate to a new resource.
//
// It keeps the initialized editors in the DOM and hides them when we navigate away,
// and shows them again when navigate back.

(() => {
  const { initResourceEditor } = Memonite;
  const swapper = new Swapper();
  const spa = Memonite.spa = {
    showResource,
  };

  init();

  function init() {
    const el = $('.m-resource').first()
    if (el.length) {
      swapper.set(location.href, el)
    }
  }

  function showResource(resource) {
    window.resource = resource


    swapper.show(resource.url, (el) => {
      // Callback to initialize the DOM element if wasn't in the cache
      el.html(resource.body)
      initResourceEditor(resource, el)
    })
  }

  function Swapper(el) {
    const cache = {}

    this.set = (key, el) => {
      cache[key] = el;
    }

    this.show = (key, initialize) => {
      const parent = $('.m-resource').parent();
      $('.m-resource').hide().removeClass('m-resource')

      var el = cache[key]
      if (el) {
        console.log('resource element found in cache')
        el.addClass('m-resource').show()
      }
      else {
        console.log('resource element not in cache')
        el = $('<div class="m-resource">')
        parent.append(el)
        cache[key] = el
        initialize(el)
      }
    }
  }
})()