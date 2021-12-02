const uniformSetters = (gl, location, type) => ({
  [gl.BOOL]:                          value => gl.uniform1i(location, value),
  [gl.BOOL_VEC2]:                     value => gl.uniform2iv(location, value),
  [gl.BOOL_VEC3]:                     value => gl.uniform3iv(location, value),
  [gl.BOOL_VEC4]:                     value => gl.uniform4iv(location, value),
  [gl.FLOAT]:                         value => gl.uniform1f(location, value),
  [gl.FLOAT_MAT2]:                    value => gl.uniformMatrix2fv(location, false, value),
  [gl.FLOAT_MAT2x3]:                  value => gl.uniformMatrix2x3fv(location, false, value),
  [gl.FLOAT_MAT2x4]:                  value => gl.uniformMatrix2x4fv(location, false, value),
  [gl.FLOAT_MAT3]:                    value => gl.uniformMatrix3fv(location, false, value),
  [gl.FLOAT_MAT3x2]:                  value => gl.uniformMatrix3x2fv(location, false, value),
  [gl.FLOAT_MAT3x4]:                  value => gl.uniformMatrix3x4fv(location, false, value),
  [gl.FLOAT_MAT4]:                    value => gl.uniformMatrix4fv(location, false, value),
  [gl.FLOAT_MAT4x2]:                  value => gl.uniformMatrix4x2fv(location, false, value),
  [gl.FLOAT_MAT4x3]:                  value => gl.uniformMatrix4x3fv(location, false, value),
  [gl.FLOAT_VEC2]:                    value => gl.uniform2fv(location, value),
  [gl.FLOAT_VEC3]:                    value => gl.uniform3fv(location, value),
  [gl.FLOAT_VEC4]:                    value => gl.uniform4fv(location, value),
  [gl.INT]:                           value => gl.uniform1i(location, value),
  [gl.INT_SAMPLER_2D]:                value => gl.uniform1i(location, value),
  [gl.INT_SAMPLER_2D_ARRAY]:          value => { throw "Not Implemented"; },
  [gl.INT_SAMPLER_3D]:                value => gl.uniform1i(location, value),
  [gl.INT_SAMPLER_CUBE]:              value => gl.uniform1i(location, value),
  [gl.INT_VEC2]:                      value => gl.uniform2iv(location, value),
  [gl.INT_VEC3]:                      value => gl.uniform3iv(location, value),
  [gl.INT_VEC4]:                      value => gl.uniform4iv(location, value),
  [gl.SAMPLER_2D]:                    value => gl.uniform1i(location, value.slot || value),
  [gl.SAMPLER_2D_ARRAY]:              value => { throw "Not Implemented"; },
  [gl.SAMPLER_2D_ARRAY_SHADOW]:       value => gl.uniform1i(location, value),
  [gl.SAMPLER_2D_SHADOW]:             value => gl.uniform1i(location, value),
  [gl.SAMPLER_3D]:                    value => gl.uniform1i(location, value),
  [gl.SAMPLER_CUBE]:                  value => gl.uniform1i(location, value),
  [gl.SAMPLER_CUBE_SHADOW]:           value => gl.uniform1i(location, value),
  [gl.UNSIGNED_INT]:                  value => gl.uniform1ui(location, value),
  [gl.UNSIGNED_INT_SAMPLER_2D]:       value => gl.uniform1i(location, value),
  [gl.UNSIGNED_INT_SAMPLER_2D_ARRAY]: value => { throw "Not Implemented"; },
  [gl.UNSIGNED_INT_SAMPLER_3D]:       value => gl.uniform1i(location, value),
  [gl.UNSIGNED_INT_SAMPLER_CUBE]:     value => gl.uniform1i(location, value),
  [gl.UNSIGNED_INT_VEC2]:             value => gl.uniform2uiv(location, value),
  [gl.UNSIGNED_INT_VEC3]:             value => gl.uniform3uiv(location, value),
  [gl.UNSIGNED_INT_VEC4]:             value => gl.uniform4uiv(location, value),
}[type]);


export function linkUniformLocations() {
    const {id, gl} = this;
    const numUniforms = gl.getProgramParameter(id, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < numUniforms; ++i) {
      const uniform   = gl.getActiveUniform(id, i);
      const location  = gl.getUniformLocation(id, uniform.name);

      this[uniform.name] = uniformSetters(gl, location, uniform.type);
    }
  }