+++
draft = false
Title = "AZUL MODERNO"
subtitle = "AZUL MODERNO"
layout = "azul"
thumbnail = "/images/textures/cashmere-la.jpg"
thumbscheme = "light"

video = "https://vimeo.com/281469399"

[[resources]]
  name = "fundo"
  src = "images/fundo.png"

[[resources]]
  name = "santa"
  src = "images/santa.png"

[[resources]]
  name = "logo"
  src = "images/logo.png"

[[resources]]
  name = "text_poster"
  src = "images/poster7.png"

[[resources]]
  name = "text_fundo"
  src = "images/fundo.png"

[[resources]]
  name = "video_poster"
  src = "images/fundo.png"

[[resources]]
  name = "video_clipe"
  src = "images/AZUL MODERNO_baixa.mp4"

+++


<div class="theater">
    <div id="screen" class="screen hidden">
        <video preload  poster='{{% resource_path path="video_poster" %}}'>
            <source src='{{% resource_path path="video_clipe" %}}' />
	    </video>
    </div>
    <div id="poster" class="spotlight">
        <video autoplay playsinline muted loop preload
        onloadeddata="document.dispatchEvent(new Event('posterPreloaded'))"  poster='{{% resource_path path="text_poster" %}}'>
            <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ocean-small.webm"/>
            <source src="https://thenewcode.com/assets/videos/ocean-small.mp4" />
	    </video>
        <a href="#play" class="logo">AZUL<br/>moderno</a>
    </div>

</div>