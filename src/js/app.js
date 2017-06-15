// JS Goes here - ES6 supported
const docStyle = document.documentElement.style;
const pointerClick = (document.ontouchstart === undefined ? 'click' : 'touchstart' )

function start() {
  scrollListener()
  fixHrefTarget(document)
  
  hoverInOut(document, '.menu-header.has-submenu.hoverable' )
}


/*
 * Listen to scroll-y, update css --scrolly variable
 */
function scrollListener() {
  // add passive listener
  const scrollHandler = document.addEventListener("scroll", (ev) => {
    docStyle.setProperty("--scrolly", document.body.scrollTop)
  }, {passive: true})
}


/**
 * fixHrefTarget
 *  Mimics :target behaviour using class toggling.
 *  in CSS use :is-target, instead of :target
 */
function fixHrefTarget( container , tgtClass=':is-target') {
  let linksWithHash = container.querySelectorAll('a[href^="#"]')
  let target = undefined
  
  linksWithHash.forEach( (link) => {
    link.addEventListener( pointerClick, function(e) {
      e.preventDefault()
      
      // remove old target
      if(target){ target.classList.remove(':is-target') }
      
      // set new target
      var newTgt = this.getAttribute('href')
      if( newTgt != '#') {
        target = container.querySelector( newTgt )
        target.classList.add(':is-target')
      }
    })
  })
}

/** 
 * Add class .in / out based on 'hover' of element
 */
function hoverInOut( container, selector='hoverable', timeout=5000) {
  var hoveredEls = container.querySelectorAll( selector )
  hoveredEls.forEach( (el) => {
    console.log("Adding hover behaviour to -> ", el)
    let is_hovered = false;
    el.addEventListener('mouseover', (ev) => {
      console.log("mousein")
      is_hovered = true;
      el.classList.remove('out')
      el.classList.add('in')
    })
    el.addEventListener('mouseout', (ev) => {
      console.log("mouseout")
      is_hovered = false;
      el.classList.add('out')
      el.classList.remove('in')
    })
  })
}


document.addEventListener("DOMContentLoaded", start)