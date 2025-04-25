# Prototype planet orbits

Turn based space game where planets orbit a star throughout the game, making an ever-changing map

To play and/or develop, use:
```
python3 serve.py
```
... should serve the game locally on port 8080 and echo out any console errors that get POST-ed to the server

# 2024-12-25

Copied a base over from protoype-map-dragging & added instructions to the README

# 2024-12-26

Sin(Theta) = Opposite / Hypotenuse
Sin(Theta)/Hypotenuse = Opposite // ie: y value!

Cosine(Theta) = Adjacent / Hypotenuse
Cosine(Theta) / Hypotenuse = Adjacent // ie: x value!

# 2024-12-27

Ok, got the radiants conversion working correctly, but I think I might doing the offset math wrong. Still getting ridiculously small values.

# 2024-12-29

Ok, had 2 (or 3) problems going on:
1. I was _dividing_ by `dist` (ie: hypotenuse) instead of _multiplying_ by it like I was supposed to (basic algebra mistake)
2. Apparently JS (or maybe just my own code somehow?) _assume_ you're working in _radiants_, not degrees for the sin/cos/tan functions (apparently the equations work no matter what your unit of measure is, but if you change units half way then you'll get numbers that make no sense)

Next up:
- I'd love to animate the end-of-turn planet movements, but I'll really have to think hard about how to do that...
- next gameplay task is probably making the planets selectable.

# 2024-12-30

Selectable planets:
    - click handler
    - selected planet var
    - display planet info UI

Animation:
    - time length
    - 30fps
    - interval dist to move each frame
    - when to start/stop animation


# 2025-01-27

Well, apparently last time I did _none_ of that and instead dove head-first into implementing multi-touch... yeah, that's gonna take a minute

# 2025-03-13

Ok, I've commented out a lot of debug info (from my chromebook now), and I'm wondering: do we even _need_ to be able to select planets? Like, what's the point? If you can't do anything on them (they produce units automatically; you can't change anything about their behaviour), then let's just remove that as a feature and save ourselves the trouble of making it make sense in the context of the game. 

Fleets appear on the planet, tap the fleet to select it.

Fleets on planets move with their planets.

Do fleets in orbital paths move with planets, too? or no?

Like, if a probe is out in an orbital path and _stops_ moving, it would fall into the sun, but it would have to exert a tremendous amount of delta-V to get to where it's not moving relative to the sun anymore.

Worth thinking about.

# 2025-04-06

TODO: limit scale factor so the orbit radiai never get negative
