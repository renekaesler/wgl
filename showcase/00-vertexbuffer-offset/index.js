import { ElementArrayBuffer, ArrayBuffer }  from '../../src/buffer'; 
import Program                              from '../../src/program.js';
import Wgl                                  from '../../src/wgl.js';

import Mat4         from '../../src/math/mat4.js';
import { degToRad } from '../../src/math/index.js';

import { vertices, indices }  from './box.js';
import fragSource             from './shader.frag';
import vertSource             from './shader.vert';

const gl            = Wgl();
const program       = Program.create(gl, vertSource, fragSource);
const indexBuffer   = new ElementArrayBuffer(gl, new Uint16Array(indices));
const vertexBuffer  = new ArrayBuffer(gl, new Float32Array(vertices));
const uniforms      = {
  mProj: new Mat4(),
  mView: new Mat4(),
  mWorld: new Mat4()
};

let lastCall = performance.now();

uniforms.mView.lookAt([0, 4, -8], [0, 0, 0], [0, 1, 0]);

gl.clearColor(0.1, 0.1, 0.25 , 1.0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.frontFace(gl.CCW);
gl.cullFace(gl.BACK);

program.vertPosition(vertexBuffer, 6)
program.vertColor(vertexBuffer, 6, 3);

program.use();

gl.addEventListener('resize', ({width, height}) => {
  uniforms.mProj.perspective(degToRad(45), width / height, 0.1, 1000.0);
});

gl.run(now => {
  const delta = now - lastCall;

  uniforms.mWorld.rotateY(delta * 0.001);

  program.set(uniforms);

  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indexBuffer.length, gl.UNSIGNED_SHORT, 0);

  lastCall = now;
});

export default gl.canvas;
