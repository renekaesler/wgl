const isArrayBufferView = val => val && val.buffer instanceof ArrayBuffer && val.byteLength !== undefined;

// TODO: Put this to the gl context for avoiding object creation for every texture2D call
const textureFormats = gl => ({
  [gl.LUMINANCE]: { format: gl.LUMINANCE, type: gl.UNSIGNED_BYTE },
  [gl.ALPHA]:     { format: gl.ALPHA,     type: gl.UNSIGNED_BYTE },
  [gl.R8]:        { format: gl.RED,       type: gl.UNSIGNED_BYTE },
  [gl.RG16F]:     { fromat: gl.RGB,       type: gl.FLOAT },
  [gl.RGB]:       { format: gl.RGB,       type: gl.UNSIGNED_BYTE },
  [gl.RGBA]:      { format: gl.RGBA,      type: gl.UNSIGNED_BYTE },
  [gl.RGB16F]:    { format: gl.RGB,       type: gl.FLOAT },
  [gl.RGBA16F]:   { format: gl.RGBA,      type: gl.FLOAT }
});

class Texture2D {
  constructor(gl, img, options = {}) {
    this.gl = gl;
    this.id = gl.createTexture();
    this.slot = options.slot || this.gl.getSlot();

    this.bind(this.slot);
    this.texImage2D(img, options);
    this.texParameteri(options);
  }

  bind(slot) {
    if (slot) this.active(slot);

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    return this;
  }

  unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    return this;
  }

  active(slot = 0) {
    this.slot = slot;
    this.gl.activeTexture(this.gl.TEXTURE0 + slot);
  }

  delete() {
    this.unbind();
    this.gl.deleteTexture(this.id);
  }

  generateMipmap() {
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    return this;
  }

  texImage2D(img, { internalFormat = this.gl.RGB, width, height } = {}) {
    const mipmaps = Array.isArray(img) ? img : [img];
    const format  = textureFormats(this.gl)[internalFormat].format;
    const type    = textureFormats(this.gl)[internalFormat].type;

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

    for (let level = 0, len = mipmaps.length; level < len; ++level) {
      const mipmap = mipmaps[level] || null;

      if (this.gl instanceof WebGLRenderingContext && !isArrayBufferView(img)) {
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          level,
          internalFormat,
          format,
          type,
          mipmap
        );
      }
      else {
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          level,
          internalFormat,
          mipmap.width || width,
          mipmap.height || height,
          0,
          format,
          type,
          mipmap
        );
      }
    }

    return this;
  }

  texParameteri({
    minFilter = this.gl.LINEAR,
    magFilter = this.gl.LINEAR,
    wrapS = this.gl.CLAMP_TO_EDGE,
    wrapT = this.gl.CLAMP_TO_EDGE,
  }) {
    if (minFilter) this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, minFilter);
    if (magFilter) this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, magFilter);
    if (wrapS) this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrapS);
    if (wrapT) this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrapT);

    return this;
  }
}

export default Texture2D;
