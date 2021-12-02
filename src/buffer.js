class Buffer {
  constructor(gl, type, data, usage = gl.STATIC_DRAW) {
    this.gl       = gl;
    this.id       = gl.createBuffer();
    this.type     = type;
    this.dataType = data.constructor;
    this.length   = data.length;

    gl.bindBuffer(type, this.id);
    gl.bufferData(type, data, usage);
  }

  bind() {
    this.gl.bindBuffer(this.type, this.id);
  }

  unbind() {
    this.gl.bindBuffer(this.type, null);
  }
}

class ArrayBuffer extends Buffer {
  constructor(gl, data, usage = gl.STATIC_DRAW) {
    super(gl, gl.ARRAY_BUFFER, data, usage);
  }
}

class ElementArrayBuffer extends Buffer {
  constructor(gl, data, usage = gl.STATIC_DRAW) {
    super(gl, gl.ELEMENT_ARRAY_BUFFER, data, usage);
  }
}

export {
  ArrayBuffer,
  ElementArrayBuffer
};

export default Buffer;
