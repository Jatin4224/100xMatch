const { z } = require("zod");
const validator = require("validator");

const validatedData = (req) => {
  const requiredBody = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z
      .string()
      .email("Invalid email address.")
      .max(200, "Email should not exceed 200 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .refine((value) => validator.isStrongPassword(value), {
        message:
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      }),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    throw new Error(JSON.stringify(parsedData.error.format()));
  }

  return parsedData.data;
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "about", "age", "gender"];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validatedData, validateEditProfileData };
