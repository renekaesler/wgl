class Shader {
  constructor(gl, type, source) {
    this.id = gl.createShader(type);

    gl.shaderSource(this.id, source);
    gl.compileShader(this.id);

    if (!gl.getShaderParameter(this.id, gl.COMPILE_STATUS)) {
      console.error('ERROR compiling shader!', gl.getShaderInfoLog(this.id));
    }

  }
}

class VertexShader extends Shader {
  constructor(gl, code) {
    super(gl, gl.VERTEX_SHADER, code);
  }
}

class FragmentShader extends Shader {
  constructor(gl, code) {
    super(gl, gl.FRAGMENT_SHADER, code);
  }
}

export {
  VertexShader,
  FragmentShader
};

export default Shader;
