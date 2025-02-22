import { v4 as uuidv4 } from "uuid";

export default class NewJobPost {
  static jobPostingArray = [];
  constructor(
    id,
    role,
    designation,
    location,
    companyName,
    salary,
    jobopening,
    dob,
    skills = []
  ) {
    this.id = id;
    this.role = role;
    this.designation = designation;
    this.location = location;
    this.companyName = companyName;
    this.salary = salary;
    this.jobopening = jobopening;
    this.dob = dob;
    this.skills = skills;
  }
  static newJobPost(post) {
    const {
      role,
      designation,
      location,
      companyName,
      salary,
      jobopening,
      dob,
      skills 
    } = post;
    const id = uuidv4();
    const newJob = new NewJobPost(
      id,
      role,
      designation,
      location,
      companyName,
      salary,
      jobopening,
      dob,
      skills 
    );
     NewJobPost.jobPostingArray.push(newJob);
      return NewJobPost.jobPostingArray;
  }
  static getAllJobs() {
    return NewJobPost.jobPostingArray;
  }
 }
 
