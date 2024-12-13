const { z } = require("zod");
const validator = require("validator");

const validatedData = (req) => {
  // Define Zod schema for validation
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

  // Parse and validate the request body
  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    // Throw error if validation fails
    throw new Error(
      JSON.stringify(parsedData.error.format()) // Format Zod error for clarity
    );
  }

  // Return validated data
  return parsedData.data;
};

module.exports = validatedData;
