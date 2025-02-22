import express from "express";
// import ejs from "express-ejs-layouts";
import path from "path";
import HomepageController from "./src/controller/homepage.controller.js";
import registrationValidation from "./src/middleware/registration.validationMiddleware.js";
import loginValidation from "./src/middleware/login.validationMiddleware.js";
import jobSeekerValidation from "./src/middleware/jobAppliyingMiddleware.js";
import upload from "./src/middleware/upload.js";
import session from "express-session";
import cookieparser from "cookie-parser";
import setVisit from "./src/middleware/lastVisitMiddleware.js";
const server = express();
server.use(cookieparser());
server.use(setVisit);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  session({
    secret: "shashank", // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
server.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// multer use 
server.post("/uploads",upload.single("resume"),(req,res)=>{
  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }

  // Check file extension
  if (!req.file.filename.endsWith(".pdf")) {
    return res.status(400).send("Invalid file format! PDF required.");
  }

  res.send("File uploaded successfully!");
});

server.get("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});
// creating server
server.use(express.static(path.resolve("src", "public" )));
server.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// encoding the data into json format so that it can be used in the backend

// ejs engine setup
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));

server.get("/", HomepageController.getHomepage);
server.get("/jobPosting", HomepageController.getJobPage);
server.get("/registrationForm", HomepageController.getRegisterPage);
// here is the route for the login form after submitting the registration form
server.get("/login2", HomepageController.getLoginPage1);
// here is the route for the new job posting form
server.get("/postjobs", HomepageController.getPostJobForm);
server.get("/login", HomepageController.getLoginPage);
// here is the route for the login form from registration form where login button lies
server.get("/login1", HomepageController.getLoginPage1);
// here is the route for details about the perticular job
server.get("/jobDetails/:id", HomepageController.detailsOfJob);
// here is the route for deleting the job post from job posting page by recruiter
server.get("/deleteJob/:id", HomepageController.deleteJob);
// here is the route for updating the job post from job posting page by recruiter
server.get("/updateJob/:id", HomepageController.editJob); // Route to fetch job details
server.get("/jobSeekerRegistration",HomepageController.jobSeekerRegistrationForm);
 

server.post("/updateJob/:id", HomepageController.updateJob); // Route to update job
server.post(
  "/registrationForm",
  registrationValidation,
  HomepageController.getLoginPage
);
// here is the route when new job is posted it shows in job posting page
server.post("/postjobs", HomepageController.postNewJob);

server.post(
  "/login",
  loginValidation,
  HomepageController.getRecruiterJobPostingPage
);

server.get('/viewApplicants/:jobId',  HomepageController.viewApplicants);


// here is the route for jobseeker registration form
server.post("/applyJob",jobSeekerValidation,HomepageController.getApplyConfirmation);
server.listen(5500, () => {
  console.log("Server is running on port 5500");
});
