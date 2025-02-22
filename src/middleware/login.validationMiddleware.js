import { body, validationResult } from "express-validator";
import RegisterRecruiterData from "../model/register-recruiterModel.js";

const loginValidation = async (req, res, next) => {
  const recruiterData = RegisterRecruiterData.getRecruiterList();

  const newRules = [
    // Email validation
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .custom((value) => {
        const recruiter = recruiterData.find(
          (recruiter) => recruiter.email === value
        );
        if (!recruiter) {
          throw new Error("Email not found");
        }
        return true;
      }),

    // Password validation
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .custom((value, { req }) => {
        const recruiter = recruiterData.find(
          (recruiter) => recruiter.email === req.body.email
        );
        if (!recruiter || recruiter.password !== value) {
          throw new Error("Invalid  password");
        }
        return true;
      }),
  ];

  await Promise.all(newRules.map((rule) => rule.run(req)));

  // Checking for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).render("homePage", {
      body: "recruiter-loginForm",
      errors: errors.array(),
    });
  }
  next();
};

export default loginValidation;
