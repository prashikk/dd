import { body, validationResult } from "express-validator";

const registrationValidation = async (req, res, next) => {
  const rules = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ min: 13 })
      .withMessage("Email must be at least 13 characters long"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  //  Get validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("homePage", {
      body: "recruiter-registrationForm",
      errors: errors.array(),
    });
  }

  // No errors, move to next middleware
  next();
};

export default registrationValidation;
