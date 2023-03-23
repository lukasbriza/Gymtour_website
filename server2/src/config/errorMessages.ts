export const errorMessages = {
  getFilter: {
    databaseError: "Get operation failed. Please contact administrator.",
  },
  getCoach: {
    databaseError: "Get operation failed. Please contact administrator.",
  },
  addCoach: {
    databaseError: "Add operation failed. Please contact administrator.",
    sameNameError: "Coach with this name already exist in this town.",
    duplicitEmailError: "Coach with this email already exist. You can´t have two profiles.",
    userDatabaseError: "Validation of owner existence failed. Please contact administrator.",
    multipleOwners: "There are more than one owner. Contact administrator please.",
    noOwner: "There is no registered user for this coach.",
    desinchronizationError: "There is desinchronization in images:",
  },
  removeCoaches: {
    databaseError: "Remove operation failed. Please contact administrator.",
    removeImgError: "Removing of image bounded to this coach failed.",
    errorDueToRemoveImgError: "Remove operation was not performed due to previous errors. Error on coach id: ",
  },
  getFitness: {
    databaseError: "Get operation failed. Please contact administrator.",
  },
  removeImgFlow: {
    removeImgError: "Removing of image bounded to this object failed.",
    noImageError: "In database is no image with that id: ",
  },
  removeFitness: {
    databaseError: "Remove operation failed. Please contact administrator.",
    removeImgError: "Removing of image bounded to this fitness failed.",
    errorDueToRemoveImgError: "Remove operation was not performed due to previous errors. Error on fitness id: ",
  },
  addFitness: {
    databaseError: "Add operation failed. Please contact administrator.",
    sameNameError: "Fitness with this name already exist in this town.",
    userDatabaseError: "Validation of owner existence failed. Please contact administrator.",
    multipleOwners: "There are more than one owner. Contact administrator please.",
    noOwner: "There is no registered user for this fitness.",
    desinchronizationError: "There is desinchronization in images:",
    addDatabaseError: "Fitnes saving failed. Please contact administrator.",
  },
  inValidation: {
    inLength: "IN prop have wrong length.",
    wrongInValue: "Wrong IN value.",
  },
  getMeta: {
    databaseError: "Get meta operation failed. Please contact administrator.",
  },
  uploadImage: {
    databaseError: "Uplad image failed. Please contact administrator.",
  },
  removeImage: {
    databaseError: "Remove image/s failed. Please contact administrator.",
    removeLoopError: "Operation over image failed:",
  },
  getImage: {
    noImage: "There is no image with that id.",
    pipeError: "Error occured in pipe.",
  },
  getUser: {
    noIdError: "Missing user id in query.",
    databaseError: "Get user operation failed. Please contact administrator.",
  },
};
