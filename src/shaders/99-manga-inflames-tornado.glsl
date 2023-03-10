/*
 * Playing with chatgpt
 *  - This is a manga tornado style in flames xd
 */
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 st = vUv;

    // Create a polar coordinate from the center of the screen
    vec2 polar = (st - 0.5) * 2.0;
    float radius = length(polar);
    float angle = atan(polar.y, polar.x);

    // Calculate the height of the tornado
    float height = abs(sin(radius * 30.0 - uTime * 3.0) * 0.3 + cos(angle * 10.0 + uTime * 5.0) * 0.1);

    // Calculate the distance from the center of the tornado
    float distance = pow(radius, 2.0) * 5.0;

    // Calculate the rotation of the tornado
    float rotation = uTime * 3.0 - radius * 10.0;

    // Transform polar coordinates to Cartesian coordinates
    vec2 cartesian = vec2(cos(angle), sin(angle)) * (distance + height * 5.0);

    // Apply rotation to the direction vector
    vec2 rotated = vec2(
      cartesian.x * cos(rotation) - cartesian.y * sin(rotation),
      cartesian.x * sin(rotation) + cartesian.y * cos(rotation)
    );

    // Apply manga-style drawing to the tornado
    float thickness = pow(smoothstep(0.0, 0.1, 1.0 - height), 0.5) * 0.05;
    float line = pow(smoothstep(0.0, thickness, 1.0 - abs(rotated.y)), 10.0);
    float edge = smoothstep(0.0, thickness * 2.0, abs(rotated.x) - 0.5 + thickness);

    // Add a dot pattern to simulate shading
    float dotSize = smoothstep(0.0, 0.1, height) * 0.03;
    float dots = fract(length(rotated * 5.0) * 10.0);

    // Apply color and shading to the tornado
    vec3 color = vec3(1.0, 0.4 + height, 0.1) * line * edge;
    color += vec3(1.0, 0.8, 0.2) * dots * height * thickness;

    // Apply color to the pixel
    gl_FragColor = vec4(color, 1.0);
}
