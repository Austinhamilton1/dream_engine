#version 300 es

precision highp float;

uniform float uTime;
uniform vec2 uResolution;

out vec4 color;

#include <hash.glsl>
#include <noise.glsl>
#include <palette.glsl>

void main() {
    vec2 uv =
        (gl_FragCoord.xy - 0.5 * uResolution)
        / uResolution.y;

    vec2 p = uv;

    float t = uTime * 0.15;

    p += 0.25 * vec2(
        sin(p.y * 3.0 + t),
        cos(p.x * 2.0 - t)
    );

    float field = 0.0;

    field += sin(p.x * 6.0 + t);
    field += sin(p.y * 7.0 - t);
    field += sin((p.x+p.y) * 5.0);

    field *= 0.333;

    field += 0.35 * noise(p * 5.0 + t);

    field = floor(field * 10.0) / 10.0;

    vec3 col = palette(field);

    float grain =
        hash(gl_FragCoord.xy * 0.5);

    col += grain * 0.03;

    color = vec4(col,1.0);
}