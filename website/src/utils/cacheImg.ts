type cacheImgProps = {
  name: string;
  img: string;
}[];

export const cacheImg = (arr: cacheImgProps) => {
  arr.forEach(async (obj) => {
    let img = new Image();
    img.src = obj.img;
    img.onload = () => {
      console.log("Img: " + obj.name + " loaded...");
    };
  });
};

export const preloadImg = (imgArr: cacheImgProps) => async (timeout: number) => {
  setTimeout(() => {
    cacheImg(imgArr);
  }, timeout);
};
