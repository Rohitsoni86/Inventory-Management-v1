import * as Yup from "yup";

const validateEmail = (value: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your email")
    .test("email", "Email is not valid", (value) => {
      return validateEmail(value);
    }),
  password: Yup.string().min(6).required("Please enter your password"),
  // captcha: Yup.number().max(18).min(0).required("Please enter captcha"),
});
