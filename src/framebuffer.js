class Framebuffer {
  constructor(gl, options = {}) {
    Object.assign(this, options);
    this.gl = gl;
    this.id = gl.createFramebuffer();
  }

  bind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.id);
  }

  unbind() {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  attach(attachmentPoint, texture, level = 0) {
    this.bind();
    this.gl.framebufferTexture2D(
      this.gl.FRAMEBUFFER, 
      attachmentPoint,
      this.gl.TEXTURE_2D,
      texture.id || texture,
      level
    );

    this.unbind();
  }
}

export default Framebuffer;
