#version 300 es

precision highp float;

uniform int uRadius;
uniform vec3 uOffset;
uniform vec2 uResolution;

out vec4 color;

void main() {
    float n = float((radius + 1) * (radius + 1));
    vec3 m0 = offset; vec3 m1 = offset; vec3 m2 = offset; vec3 m3 = offset;
    vec3 s0 = offset; vec3 s1 = offset; vec3 s2 = offset; vec3 s3 = offset;
    vec3 c;

    for(int j = -radius; j <= 0; j++) {
        for(int i = -radius; i <= 0; i++) {
            c = texture(TEXTURE, uResolution + vec2(float(i), float(j)) * src_size).rgb;
            m0 += c;
            s0 += c * c;
        }
    }

    for(int j = -radius; j <= 0; j++) {
        for(int i = -radius; i <= 0; i++) {
            c = texture(TEXTURE, uResolution + vec2(float(i), float(j)) * src_size).rgb;
            m1 += c;
            s1 += c * c;
        }
    }

    for(int j = -radius; j <= 0; j++) {
        for(int i = -radius; i <= 0; i++) {
            c = texture(TEXTURE, uResolution + vec2(float(i), float(j)) * src_size).rgb;
            m2 += c;
            s2 += c * c;
        }
    }

    for(int j = -radius; j <= 0; j++) {
        for(int i = -radius; i <= 0; i++) {
            c = texture(TEXTURE, uResolution + vec2(float(i), float(j)) * src_size).rgb;
            m3 += c;
            s3 += c * c;
        }
    }

    float min_sigma2 = 1e+2;

    m0 /= n;
    s0 = abs(s0 / n - m0 * m0);
    float sigma2 = s0.r + s0.g + s0.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m0, 1.0);
    }

    m1 /= n;
    s1 = abs(s1 / n - m1 * m1);
    float sigma2 = s1.r + s1.g + s1.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m1, 1.0);
    }

    m2 /= n;
    s2 = abs(s2 / n - m2 * m2);
    float sigma2 = s0.r + s0.g + s0.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m2, 1.0);
    }

    m3 /= n;
    s3 = abs(s3 / n - m3 * m3);
    float sigma2 = s3.r + s3.g + s3.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m3, 1.0);
    }
}