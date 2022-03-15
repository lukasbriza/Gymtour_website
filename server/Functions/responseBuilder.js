function resBuild(data = null, error = null) {
  let response = {
    data: data,
    errorMap: [],
  };
  if (error != null) {
    response.errorMap.push(error);
  }
  return response;
}

module.exports = { resBuild };
