import * as yup from 'yup';

const regexName = /^[a-z"-]+$/i;
const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@#$%^&*(){}:;<>,.?~_=|-]).{4,16}$/;
const warningRole = {
  max: 'Role too long',
  required: 'Need role',
};
const warningFirstName = {
  matches: 'Wrong Firstname',
  max: 'Firstname too long',
  required: 'Need Firstname',
};
const warningLastName = {
  matches: 'Wrong Lastname',
  max: 'Lastname too long',
  required: 'Need Lastname',
};
const warningEmail = {
  email: 'Wrong email',
  max: 'Email too long, get another',
  required: 'Need email',
};
const warningPassword = {
  matches: 'Password must contain at least 1 lowercase letter, at least 1 uppercase letter, and 1 special character',
  min: 'Password shoud be min 6 charactes',
  required: 'Need password',
};
const warningDob = {
  required: 'Need date of birthday',
};

const registerUserSchema = yup.object({
    body: yup.object({
      // role: yup.string().max(10, warningRole.max).required(warningRole.required),
      // firstName: yup.string().matches(regexName, warningFirstName.matches)
        // .max(15, warningFirstName.max).required(warningFirstName.required),
      // lastName: yup.string().matches(regexName, warningLastName.matches)
        // .max(15, warningLastName.max).required(warningLastName.required),
      email: yup.string().email(warningEmail.email).max(30, warningEmail.max)
        .required(warningEmail.required),
      password: yup.string().matches(regexPassword, warningPassword.matches)
        .min(6, warningPassword.min).required(warningPassword.required),
      // dob: yup.date().required(warningDob),
    }),
  });

const loginUserScheme = yup.object({
  body: yup.object({
    email: yup.string().email(warningEmail.email).required(warningEmail.required),
    password: yup.string().required(warningPassword.required),
  }),
});

const editUserSchema = yup.object({
  body: yup.object({
    name: yup.string().max(15, warningFirstName.max),
    email: yup.string().email(warningEmail.email).max(30, warningEmail.max),
    password: yup.string().matches(regexPassword, warningPassword.matches)
      .min(6, warningPassword.min),
  }),
});

const getAllUsers = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
  query: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
  }),
});

export { registerUserSchema, loginUserScheme, getAllUsers, editUserSchema };
