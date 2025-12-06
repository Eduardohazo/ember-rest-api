import bcrypt from 'bcrypt';


export class User {
  constructor({ id, firstname, lastname, email, mobile, password, role = "user" }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.mobile = mobile;
    this.password = password; 
    this.role = role;
    this.isBlocked = false;
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async isPasswordMatched(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
