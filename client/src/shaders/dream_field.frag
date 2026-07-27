#version 300 es

precision highp float;

uniform float uTime;
uniform vec2 uResolution;

out vec4 color;

float hash(vec2 p)
{
    return fract(
        sin(dot(p, vec2(127.1,311.7)))
        * 43758.5453123
    );
}

float noise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a,b,u.x)
        + (c-a)*u.y*(1.0-u.x)
        + (d-b)*u.x*u.y;
}

vec3 palette(float t)
{
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.00,0.15,0.35);

    return a + b*cos(6.28318*(c*t+d));
}

void main()
{
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