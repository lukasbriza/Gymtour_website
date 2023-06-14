const deviceRegExp: RegExp =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const agent = navigator.userAgent;

export const useDeviceDetect = () => {
  switch (deviceRegExp.test(agent)) {
    case true:
      return { isMobile: true };
    case false:
      return { isMobile: false };
  }
};
