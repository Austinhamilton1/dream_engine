#version 300 es

precision highp float;

in vec2 vTexCoord;

uniform sampler2D uInput;

out vec4 fragColor;

void main() {
    fragColor = texture(
        uInput,
        vTexCoord
    );
}