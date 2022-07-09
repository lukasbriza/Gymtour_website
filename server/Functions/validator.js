const { ValidationError } = require("../Functions/errorBuilder");
const { resBuild } = require("../Functions/responseBuilder");
const Joi = require("joi");

const updateUservalidation = (req, res, next) => {
  let response = resBuild();
  const updateSchema = Joi.object({
    password: Joi.string().min(9),
    username: Joi.string()
      .min(5)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/),
    email: Joi.string().email(),
  });

  const value = updateSchema.validate(req.body.update, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const deleteUservalidation = (req, res, next) => {
  let response = resBuild();
  const removeSchema = Joi.object({
    id: Joi.string().required().min(10),
  });
  const value = removeSchema.validate(req.body.delete, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const registerValidation = (req, res, next) => {
  let response = resBuild();
  const registerSchema = Joi.object({
    username: Joi.string()
      .min(5)
      .pattern(/^[a-zA-Z0-9@+-<>$#%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    password: Joi.string().min(9).required(),
    email: Joi.string().email().required(),
    terms: Joi.boolean().required(),
    dataProcessing: Joi.boolean().required(),
  });
  const value = registerSchema.validate(req.body, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const loginValidation = (req, res, next) => {
  let response = resBuild();
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const value = loginSchema.validate(req.query, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const fitnessRemoveValidation = (req, res, next) => {
  let response = resBuild();
  const removeSchema = Joi.object({
    _id: Joi.array().items(Joi.string().min(10)),
  });
  const value = removeSchema.validate(req.body.delete, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const fitnessAddValidation = (req, res, next) => {
  let response = resBuild();
  const addSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    street: Joi.string().required(),
    town: Joi.number().integer().min(11).max(13).required(),
    region: Joi.number().integer().min(1).max(14).required(),
    IN: Joi.number().integer().precision(8).required(),
    priceLevel: Joi.number().integer().min(1).max(3).required(),
    contact: Joi.object({
      tel: Joi.number().integer().precision(9),
      mobile: Joi.number().integer().precision(9),
      email: Joi.string().email().required(),
      web: Joi.string().domain(),
      facebook: Joi.string().domain(),
      twitter: Joi.string().domain(),
      google: Joi.string().domain(),
      instagram: Joi.string().domain(),
      youtube: Joi.string().domain(),
    }),
    filters: Joi.object({
      equipment: Joi.array().items(Joi.string().required()),
      general: Joi.array().items(Joi.string()),
      others: Joi.array().items(Joi.string()),
    }),
    open: Joi.object({
      mon: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      tue: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      wed: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      thu: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      fri: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      sat: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      sun: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
    }),
    descriptionBasic: Joi.string().required(),
    descriptionFull: Joi.string(),
    pistures: Joi.object({
      card: Joi.string().required(),
      detail: Joi.object({
        main: Joi.string().required(),
        others: Joi.array().items(Joi.string()),
      }),
    }),
    agreement: Joi.object({
      terms: Joi.object({
        status: Joi.boolean().required(),
      }),
      dataProcessinfForPropagation: Joi.object({
        status: Joi.boolean().required(),
      }),
    }),
    owner: Joi.string().min(10).required(),
    topped: Joi.boolean().required(),
  });
  const value = addSchema.validate(req.body.add, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const fitnessUpdateValidation = (req, res, next) => {
  let response = resBuild();
  const updateSchema = Joi.object({
    _id: Joi.string().min(10).required(),
    name: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    street: Joi.string().required(),
    town: Joi.number().integer().min(11).max(13).required(),
    region: Joi.number().integer().min(1).max(14).required(),
    IN: Joi.number().integer().precision(8).required(),
    priceLevel: Joi.number().integer().min(1).max(3).required(),
    contact: Joi.object({
      tel: Joi.number().integer().precision(9),
      mobile: Joi.number().integer().precision(9),
      email: Joi.string().email().required(),
      web: Joi.string().domain(),
      facebook: Joi.string().domain(),
      twitter: Joi.string().domain(),
      google: Joi.string().domain(),
      instagram: Joi.string().domain(),
      youtube: Joi.string().domain(),
      _id: Joi.string().min(10).required(),
    }),
    filters: Joi.object({
      equipment: Joi.array().items(Joi.string()).required(),
      general: Joi.array().items(Joi.string()),
      others: Joi.array().items(Joi.string()),
      _id: Joi.string().min(10).required(),
    }),
    open: Joi.object({
      mon: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      tue: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      wed: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      thu: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      fri: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      sat: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      sun: Joi.object({
        from: Joi.number().integer().min(0).max(24).required(),
        to: Joi.number().integer().min(0).max(24).required(),
      }),
      _id: Joi.string().min(10).required(),
    }),
    descriptionBasic: Joi.string().required(),
    descriptionFull: Joi.string(),
    pistures: Joi.object({
      card: Joi.string().required(),
      detail: Joi.object({
        main: Joi.string().required(),
        others: Joi.array().items(Joi.string()),
      }),
    }),
  });
  const value = updateSchema.validate(req.body.add, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const fitnessGetValidation = (req, res, next) => {
  let response = resBuild();
  const getSchema = Joi.object({
    query: Joi.object().required(),
    projection: Joi.array().items(Joi.string()),
    options: Joi.object(),
    limit: Joi.number(),
    order: Joi.number(),
  });
  const value = getSchema.validate(JSON.parse(req.query.get), {
    render: false,
  });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const coachAddValidation = (req, res, next) => {
  let response = resBuild();
  const createSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    alias: Joi.string().pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/),
    workPlace: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    street: Joi.string().min(3).required(),
    town: Joi.number().integer().min(11).max(13).required(),
    region: Joi.number().integer().min(1).max(14).required(),
    priceLevel: Joi.number().integer().min(1).max(3).required(),
    contact: Joi.object({
      tel: Joi.number().integer().precision(9),
      mobile: Joi.number().integer().precision(9),
      email: Joi.string().email().required(),
      web: Joi.string().domain(),
      facebook: Joi.string().domain(),
      twitter: Joi.string().domain(),
      google: Joi.string().domain(),
      instagram: Joi.string().domain(),
      youtube: Joi.string().domain(),
    }),
    filters: Joi.object({
      gender: Joi.number().string().required(),
      specialization: Joi.array().items(Joi.string()).required(),
      others: Joi.array().items(Joi.string()),
    }),
    descriptionBasic: Joi.string().required(),
    descriptionFull: Joi.string(),
    pictures: Joi.object({
      card: Joi.string().required(),
      detail: Joi.object({
        main: Joi.string().required(),
        others: Joi.array().items(Joi.string()),
      }),
    }),
    agreement: Joi.object({
      terms: Joi.object({
        status: Joi.boolean().required(),
      }),
      dataProcessinfForPropagation: Joi.object({
        status: Joi.boolean().required(),
      }),
    }),
    owner: Joi.string().min(10).required(),
  });
  const value = createSchema.validate(req.body.create, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const coachUpdateValidation = (req, res, next) => {
  let response = resBuild();
  const updateSchema = Joi.object({
    _id: Joi.string().min(10).required(),
    name: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    alias: Joi.string().pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/),
    workPlace: Joi.string()
      .min(2)
      .pattern(/^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$/)
      .required(),
    street: Joi.string().min(3).required(),
    town: Joi.number().integer().min(11).max(13).required(),
    region: Joi.number().integer().min(1).max(14).required(),
    priceLevel: Joi.number().integer().min(1).max(3).required(),
    contact: Joi.object({
      tel: Joi.number().integer().precision(9),
      mobile: Joi.number().integer().precision(9),
      email: Joi.string().email().required(),
      web: Joi.string().domain(),
      facebook: Joi.string().domain(),
      twitter: Joi.string().domain(),
      google: Joi.string().domain(),
      instagram: Joi.string().domain(),
      youtube: Joi.string().domain(),
      _id: Joi.string().min(10).required(),
    }),
    filters: Joi.object({
      gender: Joi.number().string().required(),
      specialization: Joi.array().items(Joi.string()).required(),
      others: Joi.array().items(Joi.string()),
      _id: Joi.string().min(10).required(),
    }),
    descriptionBasic: Joi.string().required(),
    descriptionFull: Joi.string(),
    pistures: Joi.object({
      card: Joi.string().required(),
      detail: Joi.object({
        main: Joi.string().required(),
        others: Joi.array().items(Joi.string()),
      }),
    }),
    owner: Joi.string().min(10).required(),
  });
  const value = updateSchema.validate(req.body.update, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};
const coachGetValidation = (req, res, next) => {
  let response = resBuild();
  const getSchema = Joi.object({
    query: Joi.object().required(),
    projection: Joi.string(),
    options: Joi.object(),
    limit: Joi.number(),
  });
  const value = getSchema.validate(req.body.get, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};
const coachDeleteValidation = (req, res, next) => {
  let response = resBuild();
  const deleteSchema = Joi.array()
    .items(Joi.string().min(10).required())
    .required();
  const value = deleteSchema.validate(req.body.delete, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const topUpdateValidation = (req, res, next) => {
  let response = resBuild();
  const topUpdateSchema = Joi.object({
    _id: Joi.string().min(10).required(),
    type: Joi.string()
      .pattern(/^[fitnescoach]+/)
      .required(),
    topped: Joi.boolean().required(),
    toDate: Joi.date(),
  });
  const value = topUpdateSchema.validate(req.body.top, { render: false });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const notificationCreateValidation = (req, res, next) => {
  let response = resBuild();
  const notificationCreateSchema = Joi.object({
    _id: Joi.string().min(10).required(),
    type: Joi.string()
      .pattern(/^[fitnescoach]+/)
      .required(),
    message: Joi.string().min(5).required(),
  });
  const value = notificationCreateSchema.validate(req.body.create, {
    render: false,
  });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

const notificationDeleteValidation = (req, res, next) => {
  let response = resBuild();
  const notificationDeleteSchema = Joi.object({
    _id: Joi.string().min(10).required(),
  });
  const value = notificationDeleteSchema.validate(req.body.delete, {
    render: false,
  });
  if (value.error) {
    new ValidationError(value.error.details[0].message, res, response);
  } else {
    next();
  }
};

module.exports = {
  updateUservalidation,
  deleteUservalidation,
  registerValidation,
  loginValidation,
  fitnessRemoveValidation,
  fitnessAddValidation,
  fitnessUpdateValidation,
  fitnessGetValidation,
  coachAddValidation,
  coachUpdateValidation,
  coachGetValidation,
  coachDeleteValidation,
  topUpdateValidation,
  notificationCreateValidation,
  notificationDeleteValidation,
};
