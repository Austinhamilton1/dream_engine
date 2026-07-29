#version 300 es

precision highp float;

uniform vec2 uResolution;
uniform sampler2D uDream;

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec2 c = vec2(
        (uv.x - 0.5) * 3.0,
        (uv.y - 0.5) * 2.0
    );

    vec2 z = vec2(0.0);

    int i;

    const int MAX = 150;

    for(i = 0; i < MAX; i++) {
        if(dot(z, z) > 4.0)
            break;

        z = vec2(
            z.x*z.x - z.y*z.y,
            2.0*z.x*z.y
        ) + c;
    }

    vec2 sampleUV = 
        uv +
        0.08 *
        normalize(z);

    fragColor = 
        texture(
            uDream,
            sampleUV
        );
}