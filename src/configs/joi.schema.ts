import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(4).max(20).required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/\d/, "number")
    .pattern(/[^\w\s]/, "symbol")
    .pattern(/^\S+$/, "noSpaces")
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/\d/, "number")
    .pattern(/[^\w\s]/, "symbol")
    .pattern(/^\S+$/, "noSpaces")
    .required(),
});


export const workspaceNameSchema = Joi.string()
  .min(4)
  .max(20)
  .required();
