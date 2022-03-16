function dateGap(dateToCompare) {
  //NEED FORMATE "MM/DD/YYYY"
  let compareDate = new Date(dateToCompare);
  let dateNow = new Date();
  let gap = dateNow.getTime() - compareDate.getTime();

  if (gap < 0) {
    return { expired: false, value: gap };
  }
  if (gap >= 0) {
    return { expired: true, value: gap };
  }
}

module.exports = dateGap;
