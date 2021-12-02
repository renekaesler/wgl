const attributeInfos = (gl, type) => ({
  [gl.FLOAT_VEC2]: { size: 2, type: gl.FLOAT },
  [gl.FLOAT_VEC3]: { size: 3, type: gl.FLOAT },
  [gl.FLOAT_VEC4]: { size: 4, type: gl.FLOAT },
}[type]);

export function linkAttribLocations() {
    const {id, gl} = this;
    const numAttributes = gl.getProgramParameter(id, gl.ACTIVE_ATTRIBUTES);
  
    for (let i = 0; i < numAttributes; ++i) {
      const attribute = gl.getActiveAttrib(id, i);
      const location  = gl.getAttribLocation(id, attribute.name);

      const { size, type } = attributeInfos(gl, attribute.type);

      this[attribute.name] = (buffer, stride = 0, offset = 0) => {
        const { BYTES_PER_ELEMENT } = buffer.dataType;

        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.id || buffer);
        gl.vertexAttribPointer(
          location, 
          size, 
          type, 
          false, 
          stride * BYTES_PER_ELEMENT, 
          offset * BYTES_PER_ELEMENT
        );
      };
    }
  }