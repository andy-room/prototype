# Blur: Bubbles & Carousel Motion Style

Motion style spec taken from the Jitter template "Blur: Bubbles & Carousel". It lives in its own folder so it does not overlap with the Petals style in the repo root. Use it as a reference to build your own motion from your own images or files. The machine-readable values are in motion-style.json in this folder.

## Look

Pure black canvas (#000000) with white Poppins type. A small ring of round photo bubbles (one in the center, six around it) spins in from a huge scale with blur, the title blurs in and out, one bubble zooms to fill the frame, then a vertical carousel of photos slides through before the hero image blurs out. The only colors come from your photos.

## Text

Headline: Poppins Medium 500, 64px, line height 110%, centered, #FFFFFF. Subheadline: Poppins Light 300, 16px, line height 120%, centered, #FFFFFF. Footer (left, center, right): Poppins Regular 400, 16px, line height 120%, #FFFFFF. Kerning pairs and ligatures are on.

## Layout

Canvas 1080x1350 (4:5), 14s. Also make 16:9, 4:3, 9:16 and 1:1. Bubbles group is 360x360 at (360, 495). Each bubble is 100x100 with corner radius 100 and clip content on. Inside each bubble the photo is about 492px at (-66, -66). The carousel step is Move Y -409.

## Easings

Only two are used. Smooth (ease in out, strength 50) for nearly everything. Slow down (ease out, strength 50) for the title exit.

## Motion timeline

0 to 2.5s, title Blur In: scale 125 to 100 percent, layer blur 50 to 0, opacity 0 to 100, Smooth.

0 to 2s, bubbles Spin In: scale 720 to 100 percent and layer blur 8.4 to 0, Smooth. Start times are staggered by about 0.05 to 0.4s so all bubbles land together at 2s. Photo opacity fades in near the end.

0 to 2.5s, ring rotation: group rotates 360 to 0 degrees while the photos counter-rotate -360 to 0, Smooth. Over 0 to 3.5s an extra group rotation of 90 to 0 adds inertia.

About 3.5 to 4.3s, title Out: scale and blur out, blur 50, final scale 50 percent, Slow down. At the same time the hero bubble zooms 0 to 315 percent and its corner radius goes 100 to 10, Smooth.

About 4.9, 6.4, 7.9 and 9.4s, carousel slides: Move Y -409 over 0.8s, Smooth, with about 0.05s stagger between cards.

About 10.9 to 11.9s, Close: bubbles move back (X 3.25, Y 2045.75) and corner radius returns to 100 over 1s, Smooth. The non-hero bubbles fade to opacity 0.

About 12.0 to 13.6s, final Out: hero layer blur to 50 over 1.6s (Smooth) and opacity to 0 over 1.6s (no easing).

Slide start times and stagger offsets were read from timeline bars, so they are approximate. Durations, values and easings were read from the panels.

## How to use with your own assets

Give an AI assistant or yourself this brief: "Using blur-bubbles-carousel/motion-style.json in this repo, build a motion for [my images or files]. Keep the black canvas, the bubble ring spin-in, the blur title in and out, the zoom into a hero bubble, the vertical carousel and the final blur-out. Use Smooth easing for the main moves. Replace the bubble photos with my images and my own title text."

Ideas: use 7 of your photos for the bubbles, keep the number of carousel slides equal to your photo count (adjust the slide start times), change the title and footer text while keeping the Poppins sizes, or change durations but keep the easings.

## Source

Jitter template "Blur: Bubbles & Carousel" (jitter.video). Values were read from the template editor. Respect the template's license and terms when publishing derived work.
