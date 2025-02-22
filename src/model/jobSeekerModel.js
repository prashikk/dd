import { v4 as uuidv4 } from "uuid";
export default class RegistrationJobSeeker{
    static jobSeekerRegistrationArray = [];
    constructor(id, name, email,contact,resume) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact =contact;
        this.resume =resume;
      }
      static jobSeekerRegistrationData(information){
        if (!information?.name || !information?.email || !information?.contact || !information?.resume) {
            throw new Error(
              "Invalid recruiter data! name, email, contact and resume are required."
            );
          }
          const { name, email, contact,resume } = information;
          const id = uuidv4();
          const newJobSeeker = new RegistrationJobSeeker(id, name, email,contact,resume);
          RegistrationJobSeeker.jobSeekerRegistrationArray.push(newJobSeeker);
          console.log(RegistrationJobSeeker.jobSeekerRegistrationArray); // Debugging output
          return RegistrationJobSeeker.jobSeekerRegistrationArray;
        }
        static getJobSeekerList(){
        console.log(RegistrationJobSeeker.jobSeekerRegistrationArray); // Debugging output
        return RegistrationJobSeeker.jobSeekerRegistrationArray; //  Static property correctly accessed
      }
       
}