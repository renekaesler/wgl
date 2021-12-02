import {
  FragmentShader,
  VertexShader 
} from './shader'

import { linkAttribLocations }  from './attribute-location-factory.js';
import { linkUniformLocations } from './uniform-location-factory.js';

class Program {
  static create(gl, vertexShaderCode, fragmentShaderCode) {
    const vertexShader    = new VertexShader(gl, vertexShaderCode);
    const fragmentShader  = new FragmentShader(gl, fragmentShaderCode);

    return new Program(gl, vertexShader, fragmentShader);
  }

  constructor(gl, ...shaders) {
    this.gl = gl;
    this.id = gl.createProgram();
    this.locations = [];

    shaders.forEach(shader => gl.attachShader(this.id, shader.id));

    gl.linkProgram(this.id);

    if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) {
      console.error('ERROR linking program!', gl.getProgramInfoLog(this.id));
    }

    gl.validateProgram(this.id);

    if (!gl.getProgramParameter(this.id, gl.VALIDATE_STATUS)) {
      console.error('ERROR validating program!', gl.getProgramInfoLog(this.id));
    }

    linkAttribLocations.call(this);
    linkUniformLocations.call(this);
  }

  getAttribLocation(name) {
    return this.gl.getAttribLocation(this.id, name);
  }

  getUniformLocation(name) {
    return this.gl.getUniformLocation(this.id, name);
  }

  set(...props) {
    for(const parameters of props) {
      for(name in parameters) {
        try {
          this[name](parameters[name]);
        } catch(e) {
          
        }
        
      }
    }
  }

  use(values) {
    this.gl.useProgram(this.id);

    if(values) this.set(values);

    return this;
  }
}

export default Program;
