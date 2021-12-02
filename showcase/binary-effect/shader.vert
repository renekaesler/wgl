#version 300 es

precision mediump float;

in  vec2 position;
out vec2 uv;

void main(void) {
  uv          = (position + 1.0) / 2.0;
  gl_Position = vec4(position, 0.0, 1.0);
}