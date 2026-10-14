# Petals Motion Style

Motion style spec taken from the Jitter template "Gradients: Petals". Use it as a reference to build your own motion from your own images or files. The machine-readable values are in motion-style.json.

## Look

Dark navy canvas (#0C1533) with six large gradient circles ("coins"). The coins use Exclusion blending, so where they overlap they produce rainbow colors that are not in the source gradients. A 16mm film grain video sits on top with Overlay blending. There is no text in this template.

## Core recipe

1. Canvas 1920x1080, 4.55s, background #0C1533. Also make 9:16 and 4:5 versions.
2. Put 6 circles (about 246px) inside one group called Comp. Set the blend of each circle group to Exclusion.
3. Fill each circle with a 4-stop radial gradient from motion-style.json (rose, ultramarine, sunset_coral, azure, jade). Rose is used twice.
4. Add a crescent shape on each circle with a linear gradient stroke (#D1FFEE, #4B0BFF, #FFD8D8).
5. Overlay grain-16mm (or any film grain video), rotation 20 degrees, Overlay blend, 100 percent, for the full duration.

## Motion

The key trick: the Comp group starts at 250 percent scale so the circles overlap heavily, then scales down while rotating.

Beat 1 (0.00s, easing A): Comp rotate to 135 degrees and scale 250 to 100 percent over 1.45s. Each coin scales 90 to 120 percent and rotates to -45 degrees over 1.45s. Gradients shift position and angle (1.32s), shapes morph to circles.

Beat 2 (about 1.19s, easing A): Comp rotate to 135 degrees and scale to 150 percent over 1.77s. Coins scale to 80 percent over 1.45s. Stroke weight 30 and changes from purple to light blue linear.

Beat 3 (about 2.73s, easing B): Comp scale to 256 percent and rotate to 149 degrees over 1.84s. Coins scale to 91 percent over 1.71s.

Easing A is cubic-bezier(0.80, 0.00, 0.42, 1.00). Easing B is Jitter "Smooth" (ease in out, strength 50).

Beat 2 and 3 start times were read from timeline bars, so they are approximate.

## How to use with your own assets

Give an AI assistant or yourself this brief: "Using petals/motion-style.json in this repo, build a motion for [my image or file]. Keep the navy background, exclusion-blended gradient circles, the 3-beat scale-and-rotate structure, easing A for the main moves and film grain overlay. Replace the circles or colors with elements from my asset, and sample 4 colors from my image to make the radial gradients."

Ideas: swap the circles for cutouts of your logo or product, build the gradients from colors sampled from your own image, change durations but keep the easing, or add your own text (this template has none, so typography is up to you).

## Source

Jitter template "Gradients: Petals" (jitter.video). Values were read from the template editor. Respect the template's license and terms when publishing derived work.
