class User {
    user_id: string;
    email: string;
    hashed_password: string;
    first_name: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    show_gender: string;
    gender_identity: string;
    gender_interest: string;
    url: string;
    about: string;
    matches: string[];
  
    constructor({ user_id, email, hashed_password }: { user_id: string; email: string; hashed_password: string }) {
      this.user_id = user_id;
      this.email = email;
      this.hashed_password = hashed_password;
      this.first_name = '';
      this.dob_day = '';
      this.dob_month = '';
      this.dob_year = '';
      this.show_gender = '';
      this.gender_identity = '';
      this.gender_interest = '';
      this.url = '';
      this.about = '';
      this.matches = [];
    }
  }
  
  export { User };
  