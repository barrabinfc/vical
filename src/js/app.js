// JS Goes here - ES6 supported
var docStyle = document.documentElement.style;

function start() {
  scrollListener()
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

document.addEventListener("DOMContentLoaded", start)
