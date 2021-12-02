export default  async function load(image) {
  return new Promise((resolve, reject) => {
    let img = new Image();

    img.onload = function() {
      const width   = this.naturalWidth || this.width;
      const height  = this.naturalHeight || this.height;

      if(width + height === 0) this.onerror();
      resolve(img);
    }

    img.onerror = reject;
    img.src = image instanceof Image ? image.src : image;
  });
}