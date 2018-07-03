var rot = require("rot")

const docStyle = document.documentElement.style;
const pointerClick = (document.ontouchstart === undefined ? "click" : "touchstart")

function start() {
  scrollListener()
  fixHrefTarget(document)

  /* Get relative address of page */
  var address = location.href.split("/")
                        .filter((t) => { return (t != "" && t != "http:") })
                        .splice(1, 10).join("/")

  /* Specific actions for Specific pages */
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
function fixHrefTarget(container, tgtClass = ":is-target") {
  const linksWithHash = container.querySelectorAll('a[href^="#"]')
  let target = undefined

  linksWithHash.forEach((link) => {
    link.addEventListener(pointerClick, function(e) {
      e.preventDefault()

      // remove old target
      if (target) { target.classList.remove(":is-target") }

      // set new target
      var newTgt = this.getAttribute("href")
      if (newTgt != "#") {
        target = container.querySelector(newTgt)
        target.classList.add(":is-target")
      }
    })
  })
}

/**
 * Add class .in / out based on 'hover' of element
 */
function hoverInOut(container, selector = "hoverable", timeout = 5000) {
  var hoveredEls = container.querySelectorAll(selector)
  hoveredEls.forEach((el) => {
    let is_hovered = false;
    el.addEventListener("mouseover", (ev) => {
      is_hovered = true;
      el.classList.remove("out")
      el.classList.add("in")
    })
    el.addEventListener("mouseout", (ev) => {
      is_hovered = false;
      el.classList.add("out")
      el.classList.remove("in")
    })
  })
}


/**
 * Ceasar cryptography to avoid spammers reading my mail address
 *
 * Acts on:
 * Links with role['link-encrypted'] and data property
 * All elements with class [ .ceasar .says ]
 */
function unlockMail() {

  /* Links */
  const links = document.querySelectorAll('a[role="link-encrypted"]')
  links.forEach((el) => {
    var mailEncrypted = el.getAttribute("data");
    var mailPlaintext = rot(mailEncrypted, -12);

    requestAnimationFrame(() => {
      el.href = mailPlaintext;
    })
  })

  /* Plain txt */
  const txts = document.querySelectorAll(".ceasar.says")
  txts.forEach((el) => {
    var encrypted = el.innerHTML
    var plaintext = rot(encrypted, -12);
    requestAnimationFrame(() => {
      el.innerHTML = plaintext;
    })
  })

}
/* Export */
window.unlockMail = unlockMail;

document.addEventListener("DOMContentLoaded", start)
