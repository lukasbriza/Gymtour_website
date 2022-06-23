function setContextBreakpoint(width: number, setBreakPoint: any) {
  if (width <= 360) {
    setBreakPoint("toMobile");
  }
  if (width > 360) {
    setBreakPoint("fromMobile");
  }
  if (width > 760) {
    setBreakPoint("fromTablet");
  }
  if (width > 980) {
    setBreakPoint("fromDesktop");
  }
  if (width > 1300) {
    setBreakPoint("fromWide");
  }
}

export { setContextBreakpoint };
