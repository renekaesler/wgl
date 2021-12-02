import { ArrayBuffer }  from '../../src/buffer.js';
import Program          from '../../src/program.js';
import Texture2D        from '../../src/texture-2d.js';
import Wgl              from '../../src/wgl.js';

import load from '../../src/loaders/image-loader';

import fragmentShader from './shader.frag';
import vertexShader   from './shader.vert';

const gl      = Wgl();
const program = Program.create(gl, vertexShader, fragmentShader);

(async () => {
  const [characters, image] = await Promise.all([
    load('/binary-effect/characters.png'),
    load('/binary-effect/grayscale.jpg')
  ]);

  program.use({
    characters: new Texture2D(gl, characters, { internalFormat: gl.LUMIANCE, wrapS: gl.REPEAT, wrapT: gl.REPEAT }),
    image:      new Texture2D(gl, image, { wrapS: gl.REPEAT, wrapT: gl.REPEAT }),
    position:   new ArrayBuffer(gl, new Float32Array([
       1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
      -1.0, -1.0
    ])),
    size : [92, 64],
    smoothness: 0.2,
  });

  gl.clearColor(0, 0.05, 0, 1);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  gl.run(time => {
    program.progress(time > 1000 ? (time - 1000) / 3000 : 0);

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  });
})();

export default gl.canvas;
