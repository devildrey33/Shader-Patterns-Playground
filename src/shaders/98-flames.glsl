/*
 * Playing with chatgpt
 *  - Trying to get cool flames........
 */
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(0.0, 1.0, 0.0, 1.0);
    float a, b, c, d;
    a = rand(i);
    b = rand(i + vec2(1.0, 0.0));
    c = rand(i + vec2(0.0, 1.0));
    d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;

    // Move the UV coordinates to the center of the screen
    uv -= 0.5;

    // Scale the UV coordinates
    uv *= 8.0;

    // Add time to the Y coordinate
    uv.y += uTime * 0.1;

    // Generate some noise
    float noiseValue = noise(uv);

    // Add the fire effect
    float fire = (1.0 - uv.y) + noiseValue * 0.25;

    // Apply the wind effect
    float wind = sin(uTime) * 0.2;
    fire += wind;

    // Output the final color
    gl_FragColor = vec4(fire, fire * 0.5, fire * 0.1, 1.0);
}
