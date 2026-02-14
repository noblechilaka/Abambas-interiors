# TODO - Luxury Preloader Animation Implementation

## Task: Implement "Moment of Weight" luxury preloader animation

### Steps:

- [ ] 1. Update CSS (styles.css) - Add pivot scale effect and update exit animations
- [ ] 2. Update JavaScript (animations.js) - Modify preloader timeline for exact timing

### Animation Requirements:

1. **Moment of Weight (0.0s - 0.3s)**: Counter hits 100 → blink once → fade (300ms)
2. **The Split (0.3s - 1.2s)**:
   - Panels scale 100%→98% (pivot effect)
   - Slide apart with cubic-bezier(0.645, 0.045, 0.355, 1)
3. **Logo Tear**: Letters fade as panels move
4. **Total Duration**: 1.2 seconds

### Timing Profile:

- 0.0s: Counter hits 100, numbers fade
- 0.3s: Split begins, panels move 5%
- 0.6s: Panels at 50%, logo at 50% opacity
- 0.9s: Panels reach edges, content sharp
- 1.2s: Panels vanish, axis line disappears last
