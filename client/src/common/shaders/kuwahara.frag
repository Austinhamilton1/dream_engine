#version 300 es

precision highp float;

in vec2 vTexCoord;

uniform int uRadius;
uniform vec2 uResolution;
uniform sampler2D uInput;

out vec4 color;

void main() {
    float n = float((uRadius + 1) * (uRadius + 1));
    vec3 m0 = vec3(0.0); vec3 m1 = vec3(0.0); vec3 m2 = vec3(0.0); vec3 m3 = vec3(0.0);
    vec3 s0 = vec3(0.0); vec3 s1 = vec3(0.0); vec3 s2 = vec3(0.0); vec3 s3 = vec3(0.0);
    vec3 c;
    vec2 texel = 1.0 / uResolution;
    vec2 uv = vTexCoord;
    const int MAX_RADIUS = 8;

    for(int j = -MAX_RADIUS; j <= 0; j++) {
        if(abs(j) > uRadius)
            continue;
        for(int i = -MAX_RADIUS; i <= 0; i++) {
            if(abs(i) > uRadius)
                continue;
            c = texture(uInput, uv + vec2(float(i), float(j)) * texel).rgb;
            m0 += c;
            s0 += c * c;
        }
    }

    for(int j = 0; j <= MAX_RADIUS; j++) {
        if(abs(j) > uRadius)
            continue;
        for(int i = -MAX_RADIUS; i <= 0; i++) {
            if(abs(i) > uRadius)
                continue;
            c = texture(uInput, uv + vec2(float(i), float(j)) * texel).rgb;
            m1 += c;
            s1 += c * c;
        }
    }

    for(int j = -MAX_RADIUS; j <= 0; j++) {
        if(abs(j) > uRadius) 
            continue;
        for(int i = 0; i <= MAX_RADIUS; i++) {
            if(abs(i) > uRadius)
                continue;
            c = texture(uInput, uv + vec2(float(i), float(j)) * texel).rgb;
            m2 += c;
            s2 += c * c;
        }
    }

    for(int j = 0; j <= MAX_RADIUS; j++) {
        if(abs(j) > uRadius) 
            continue;
        for(int i = 0; i <= MAX_RADIUS; i++) {
            if(abs(i) > uRadius)
                continue;
            c = texture(uInput, uv + vec2(float(i), float(j)) * texel).rgb;
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
    sigma2 = s1.r + s1.g + s1.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m1, 1.0);
    }

    m2 /= n;
    s2 = abs(s2 / n - m2 * m2);
    sigma2 = s2.r + s2.g + s2.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m2, 1.0);
    }

    m3 /= n;
    s3 = abs(s3 / n - m3 * m3);
    sigma2 = s3.r + s3.g + s3.b;
    if(sigma2 < min_sigma2) {
        min_sigma2 = sigma2;
        color = vec4(m3, 1.0);
    }
}