#version 300 es

precision highp float;

in vec2 vTexCoord;

uniform sampler2D uInput;

out vec4 fragColor;

void main() {
    vec2 uv = vTexCoord;

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

    float len = length(z);

    vec2 dir = 
        len > 0.0001
            ? z / len
            : vec2(0.0);

    vec2 sampleUV =
        uv + dir * 0.08;

    sampleUV = 
        clamp(
            sampleUV,
            0.0,
            1.0
        );

    fragColor = 
        texture(
            uInput,
            sampleUV
        );
}