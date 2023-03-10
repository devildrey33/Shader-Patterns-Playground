varying vec2  vUv;      // uv from vertex shader                       
uniform float uTime;    // Time in seconds

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

    // make only 2 steps (white and black)
    //strength = step(0.5, strength);

    // Use the final strength to make a gayscale
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}