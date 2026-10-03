const { z } = require("zod");
const validator = require("validator");

// turns a zod error into a single readable message
const formatZodError = (error) =>
  error.issues
    .map((issue) =>
      issue.path.length ? `${issue.path.join(".")}: ${issue.message}` : issue.message
    )
    .join(", ");

const parseOrThrow = (schema, body) => {
  const parsedData = schema.safeParse(body);
  if (!parsedData.success) {
    throw new Error(formatZodError(parsedData.error));
  }
  return parsedData.data;
};

const signupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(50),
  lastName: z.string().trim().min(1, "Last name is required.").max(50),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address.")
    .max(200, "Email should not exceed 200 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128)
    .refine((value) => validator.isStrongPassword(value), {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    }),
});

const signinSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

const editProfileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
    about: z.string().max(500),
    age: z.coerce.number().int().min(18).max(120),
    gender: z.enum(["male", "female", "other"]),
    photoUrl: z
      .string()
      .trim()
      .refine((value) => value === "" || validator.isURL(value), {
        message: "Photo URL must be a valid URL.",
      }),
    skills: z.array(z.string().trim().min(1).max(30)).max(20),
  })
  .partial()
  // reject any field not listed above (email, password, _id, ...)
  .strict();

const validatedData = (req) => parseOrThrow(signupSchema, req.body);

const validateSigninData = (req) => parseOrThrow(signinSchema, req.body);

const validateEditProfileData = (req) =>
  parseOrThrow(editProfileSchema, req.body);

module.exports = { validatedData, validateSigninData, validateEditProfileData };
