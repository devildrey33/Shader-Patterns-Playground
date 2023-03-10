varying vec2  vUv;      // uv from vertex shader                       
uniform float uTime;    // Time in seconds

// main function for this fragment shader
void main() {
    // Pass the x to the red channel and the y to the green channel with full blue channel
    vec3 color = vec3(vUv, 1.0);

    // Pass the x to the red channel and the y to the green channel with none on blue channel
    //color = vec3(vUv, 0.0);
    
    // Pass the x to the green channel and the y to the blue channel with full red channel
    //color = vec3(1.0, vUv);

    // Pass the x to the green channel and the y to the blue channel with none on red channel
    //color = vec3(0.0, vUv);

    // Create a value from 0.0 to 1.0 that depends on the current time
    //float val = clamp(sin(uTime * 2.0), 0.0, 1.0);    
    //color = vec3(1.0, vUv + val);     // Use the value to animate the gradient


    // Use the final color
    gl_FragColor = vec4(color, 1.0);
}