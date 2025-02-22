import { body, validationResult } from "express-validator";
import RegistrationJobSeeker from "../model/jobSeekerModel.js";
const jobSeekerValidation = async (req, res, next) => {
  const jobSeekerData = RegistrationJobSeeker.getJobSeekerList();
  const newRules = [
    // Email validation
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 13 })
    .withMessage("Email must be at least 13 characters long"),
    //   contact validation 
    body("contact")
    .notEmpty()
    .withMessage("contact is required")
    .isLength({ min: 14, max: 14 })
    .withMessage("contact must be 10 digits"),

     ]
    await Promise.all(newRules.map((rule) => rule.run(req)));
// Checking for validation errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  console.log(errors.array());
  return res.status(400).render("homePage", {
    body: "jobSeekerRegistrationForm",
    errors: errors.array(),
  });
}
next();
};
export default jobSeekerValidation;
