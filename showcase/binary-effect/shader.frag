#version 300 es

precision highp float;

uniform sampler2D characters;
uniform sampler2D image;

uniform float progress;
uniform float smoothness;
uniform vec2  size;

in  vec2 uv;
out vec4 fragment;

float random (vec2 st, float seed) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123 * seed);
}

float easeBit(vec2 idx) {
  float x = random(idx, 1.0) - (progress * (1.0 + smoothness));
  return smoothstep(0.0, -smoothness, x);
}

float bitMask(vec2 uvCharacter, vec2 characterIdx) {
  float randomBit     = round(random(characterIdx, 2.0));
  vec2  uvCharacters  = vec2(
    mod(uvCharacter.x / 2.0, 0.5) + (0.5 * randomBit),
    uvCharacter.y
  );

  return texture(characters, uvCharacters).r;
}

void main(void) {
  vec2 uvCharacter  = (uv - 0.5) * size;
  vec2 characterIdx = floor(uvCharacter);

  vec4  img   = texture(image, uv);
  float alpha = bitMask(uvCharacter, characterIdx) * easeBit(characterIdx);

  fragment = vec4(img.rgb, alpha);
}
