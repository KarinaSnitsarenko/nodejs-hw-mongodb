// import Joi from 'joi';

// export const createContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required().messages({
//     'string.base': 'Name must be a string',
//     'string.empty': 'Name cannot be empty',
//     'string.min': 'Name should have a minimum length of 3',
//     'string.max': 'Name should have a maximum length of 20',
//     'any.required': 'Set name for contact',
//   }),
//   phoneNumber: Joi.string().min(3).max(20).required().messages({
//     'string.base': 'Phone number must be a string',
//     'string.empty': 'Phone number cannot be empty',
//     'string.min': 'Phone number should have a minimum length of 3',
//     'string.max': 'Phone number should have a maximum length of 20',
//     'any.required': 'Set phone number for contact',
//   }),
//   email: Joi.string().email().optional().messages({
//     'string.email': 'Must be a valid email address',
//   }),
//   isFavorite: Joi.boolean().default(false),
//   contactType: Joi.string()
//     .valid('work', 'personal', 'home')
//     .default('personal'),
// });

// export const updateContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).optional().messages({
//     'string.base': 'Name must be a string',
//     'string.min': 'Name should have a minimum length of 3',
//     'string.max': 'Name should have a maximum length of 20',
//   }),
//   phoneNumber: Joi.string().min(3).max(20).optional().messages({
//     'string.base': 'Phone number must be a string',
//     'string.min': 'Phone number should have a minimum length of 3',
//     'string.max': 'Phone number should have a maximum length of 20',
//   }),
//   email: Joi.string().email().optional().messages({
//     'string.email': 'Must be a valid email address',
//   }),
//   isFavorite: Joi.boolean().default(false),
//   contactType: Joi.string()
//     .valid('work', 'personal', 'home')
//     .default('personal'),
// });

import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of 3',
    'string.max': 'Name should have a maximum length of 20',
    'any.required': 'Set name for contact',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be empty',
    'string.min': 'Phone number should have a minimum length of 3',
    'string.max': 'Phone number should have a maximum length of 20',
    'any.required': 'Set phone number for contact',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Must be a valid email address',
  }),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have a minimum length of 3',
    'string.max': 'Name should have a maximum length of 20',
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number should have a minimum length of 3',
    'string.max': 'Phone number should have a maximum length of 20',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Must be a valid email address',
  }),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .default('personal'),
});
