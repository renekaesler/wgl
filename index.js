import { ArrayBuffer, ElementArrayBuffer }  from './src/buffer.js';
import { VertexShader, FragmentShader }     from './src/shader.js';
import Framebuffer                          from './src/framebuffer.js';
import Program                              from './src/program.js';
import Texture2D                            from './src/texture-2d.js';
import VertexArray                          from './src/vertex-array.js';
import _Wgl                                 from './src/wgl';

export default function Wgl(...args) {
  const gl = _Wgl(...args);

  gl['ArrayBuffer']         = ArrayBuffer.bind(null,gl);
  gl['ElementArrayBuffer']  = ElementArrayBuffer.bind(null,gl);
  gl['VertexShader']        = VertexShader.bind(null,gl);
  gl['FragmentShader']      = FragmentShader.bind(null,gl);
  gl['Program']             = Program.bind(null,gl);
  gl['VertexArray']         = VertexArray.bind(null,gl);
  gl['Texture2D']           = Texture2D.bind(null,gl);
  gl['Framebuffer']         = Framebuffer.bind(null, gl);

  gl.Program.create = Program.create.bind(null, gl);

  return gl;
}

