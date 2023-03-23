varying vec2  vUv;      // uv from vertex shader                       
uniform float uTime;    // Time in seconds

// main function for this fragment shader
void main() {
    // vUv goes from 0 to 1, so the middle is 0.5
    // strength is lower at center and higer on the edges
    vec3 color = vec3(distance(vUv, vec2(0.5)));

    // make a step to create a solid circle
    color = step(0.25, color);

    // invert the colors
    color = 1.0 - color;

    // lets do the first gradient again, but a 25% darker, so some values go below 0.
    // abs function makes all negative values to positive, and now whe have a dona gradient.
    color = vec3(abs(distance(vUv, vec2(0.5)) - 0.25));

    // make a step to create a solid dona
    color = step(0.1, color);

    // animate them
    color = step(abs(sin(uTime) * 0.2), vec3(abs(distance(vUv, vec2(0.5)) - 0.25)));

    // Use the final color
    gl_FragColor = vec4(color, 1.0);
}