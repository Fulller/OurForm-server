import Joi from "joi";

const userValidate = (data) => {
  return Joi.object({
    email: Joi.string().email().pattern(new RegExp("@gmail.com")).required(),
    password: Joi.string()
      .min(6)
      .max(100)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }).validate(data);
};

export { userValidate };
