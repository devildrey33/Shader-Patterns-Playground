#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float uTime;
uniform sampler2D iChannel0;

#define u_time uTime

varying vec2 vUv;
//	<https://www.shadertoy.com/view/4dS3Wd>
//	By Morgan McGuire @morgan3d, http://graphicscodex.com
//
float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float noise(float x) {
	float i = floor(x);
	float f = fract(x);
	float u = f * f * (3.0 - 2.0 * f);
	return mix(hash(i), hash(i + 1.0), u);
}

float noise(vec2 x) {
	vec2 i = floor(x);
	vec2 f = fract(x);

	// Four corners in 2D of a tile
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));

	// Simple 2D lerp using smoothstep envelope between the values.
	// return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
	//			mix(c, d, smoothstep(0.0, 1.0, f.x)),
	//			smoothstep(0.0, 1.0, f.y)));

	// Same code, with the clamps in smoothstep and common subexpressions
	// optimized away.
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 st = vUv;
    st = st * 2.0 - 1.0;
//    st.x *= u_resolution.x / u_resolution.y;
    float d = length(st);

    vec3 color = vec3(1.0);
//    float noise = noise(st * 2.0 + vec2(u_time * 0.1));

    if (d < 0.8) {
        color = mix(vec3(1.0), vec3(0.0), smoothstep(0.6, 0.8, d));
    } else {
        color = vec3(0.0);
    }

    float noiseFactor = 0.075;
    float noiseValue = noise(st * 2.0 + vec2(u_time * 1.1));
    float noiseDisplacement = noiseFactor * noiseValue;

    float radius = 0.5 + noiseDisplacement;
    float circle = smoothstep(radius, radius + 0.02, d);

    color = mix(color, vec3(0.0), circle);
    float alpha = 0.85;
    if (color.r > 0.0) alpha = 0.0;
    gl_FragColor = vec4(color, alpha);
}    