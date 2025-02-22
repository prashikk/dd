export default class RegisterRecruiterData {
  static recruiterData = [];

  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static getRegisterRecruiterData(information) {
    if (!information?.name || !information?.email || !information?.password) {
      throw new Error(
        "Invalid recruiter data! Name, email, and password are required."
      );
    }

    const { name, email, password } = information;
    const id =
      name.slice(0, 2) +
      name.length +
      email.slice(0, 2) +
      Math.floor(Math.random() * 1000);

    const newRecruiter = new RegisterRecruiterData(id, name, email, password);

    RegisterRecruiterData.recruiterData.push(newRecruiter);

    console.log(RegisterRecruiterData.recruiterData); // Debugging output
    return newRecruiter;
  }

  static getRecruiterList() {
    return RegisterRecruiterData.recruiterData; //  Static property correctly accessed
  }
}
