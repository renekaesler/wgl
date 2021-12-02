class VertexArray {
  constructor(gl, block) {
    this.gl = gl;
    this.id = gl.createVertexArray();

    gl.bindVertexArray(this.id);
    if( typeof block === 'function') block(this);
  }

  bind() {
    this.gl.bindVertexArray(this.id);
  }

  unbind() {
    this.gl.bindVertexArray(null);
  }
}

export default VertexArray;
