// uv from vertex shader
varying vec2 vUv;
uniform float uTime;

// main function for this fragment shader
void main() {
    // Pass the x coordinate to the red channel
    gl_FragColor = vec4(vUv, 1.0, 1.0);

    // Pass the x to the red channel and the y to the green channel    
    //gl_FragColor = vec4(vUv, 0.0, 1.0);
    
    // Pass the x to the green channel and the y to the blue channel
    //gl_FragColor = vec4(1.0, vUv, 1.0);

    // Animate the initial position of x and y
    //float speed = uTime * 0.3;
    //gl_FragColor = vec4(1.0, mod(vUv + speed, 1.0), 1.0);
}