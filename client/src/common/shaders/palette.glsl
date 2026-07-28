vec3 palette(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.00,0.15,0.35);

    return a + b*cos(6.28318*(c*t+d));
}