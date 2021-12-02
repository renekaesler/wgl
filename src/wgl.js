export default function create(options = {}) {
  const canvas    = options.canvas || document.createElement('canvas');
  const gl        = canvas.getContext(options.contextType || 'webgl2', options);
  const listeners = Object.freeze({ resize: new Set() });

  let renderCall = () => {};

  function loop(now) {
    resize();
    renderCall(now);

    loop.requestId = requestAnimationFrame(loop);
  }

  function resize() {
    const width   = canvas.clientWidth;
    const height  = canvas.clientHeight;

    if (canvas.width === width && canvas.height === height) return;

    canvas.width  = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);

    listeners.resize.forEach(listener => listener({ width, height }));
  }

  gl.loop = render => renderCall = render;

  gl.addEventListener = (type, listener) => {
    listeners[type].add(listener);
  };

  gl.render = (render) => {
    if (render) renderCall = render;

    resize();
    renderCall();
  }

  gl.run = (render) => {
    if (render) renderCall = render;
  
    requestAnimationFrame(loop);
  }

  gl.removeEventListener = (type, listener) => {
    listeners[type].add(listener);
  };

  const availableSlots = [0,1,2,3,4,5,6,7,8];
  gl.getSlot = () => {
    return availableSlots.shift();
  };

  Object.defineProperty(gl, 'renderCall', {
    set: function(render) { renderCall = render; }
  });

  return gl;
}