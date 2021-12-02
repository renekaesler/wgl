import { ArrayBuffer }  from '../../src/buffer.js';
import Program          from '../../src/program.js';
import Wgl              from '../../src/wgl.js';

import { degToRad } from '../../src/math/index.js';
import Mat4         from '../../src/math/mat4.js';

import fragmentShader from './shader.frag';
import vertexShader   from './shader.vert';

const gl = Wgl();
const program = Program.create(gl, vertexShader, fragmentShader);

const uniforms = {
  uMVMatrix: new Mat4(),
  uPMatrix: new Mat4()
}

const square = {
  aVertexPosition: new ArrayBuffer(gl, new Float32Array([
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
  ])),
  aVertexColor: new ArrayBuffer(gl, new Float32Array([
    0.5, 0.5, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, 0.5, 1.0, 1.0
  ]))
}

const triangle = {
  aVertexPosition: new ArrayBuffer(gl, new Float32Array([
    0.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ])),
  aVertexColor: new ArrayBuffer(gl, new Float32Array([
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ]))
}

gl.clearColor(0.1, 0.1, 0.25, 1.0);
gl.enable(gl.DEPTH_TEST);
program.use();

gl.addEventListener('resize', ({ width, height }) => {
  uniforms.uPMatrix.perspective(degToRad(45), width / height, 0.1, 1000.0);
});

gl.run(() => {
  // reset context
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  uniforms.uMVMatrix.identity();

  // draw triangle
  uniforms.uMVMatrix.translate(-1.5, 0.0, -7);
  program.set(uniforms, triangle);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // draw square
  uniforms.uMVMatrix.translate(3.0, 0.0, 0.0);
  program.set(uniforms, square);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
});

export default gl.canvas;
