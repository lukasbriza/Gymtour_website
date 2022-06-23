interface detectMobileType {
  width: number | undefined;
  isMobile: boolean;
}

let detectObj: detectMobileType = {
  width: undefined,
  isMobile: false,
};

function deviceDetect() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    detectObj.isMobile = true;
    detectObj.width = window.innerWidth;

    return detectObj;
  } else {
    detectObj.isMobile = false;
    detectObj.width = window.innerWidth;

    return detectObj;
  }
}

export { deviceDetect };
