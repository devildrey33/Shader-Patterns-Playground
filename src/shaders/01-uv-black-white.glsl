// uv from vertex shader
varying vec2 vUv;
uniform float uTime;

// main function for this fragment shader
void main() {
    // strength
    float strength = 0.0;

    // Pass the x coordinate to the three channels
    strength = vUv.x;

    // Pass the y coordinate to the three channels
    //strength = vUv.y;
    
    // Pass the inverted y coordinate to the three channels
    //strength = 1.0 - vUv.y;

    // Pass the y coordinate multiplied by 10
    //strength = vUv.y * 10.0;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}