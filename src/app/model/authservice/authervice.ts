import {AxiosService} from "../../axios.service";
import {User} from "../usermodel";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Authervice{

  constructor(private axiosService:AxiosService,private user:User) {

  }

  get User(){
    return this.user;
  }

  login(username:String,password:String){
    this.axiosService.request(
      "POST",
      "/userlogin", {
        "username": username,
        "password": password,
      }
    )
      .then(response => {
        const userData=response.data;
        const user=new User();

        user.id=userData.id;
        user.username = userData.username;
        user.password = userData.password; // Do not include password in the frontend model for security reasons
        user.email = userData.email;
        user.contact = userData.contact;
        user.role = userData.roles;
        user.empID = userData.employee;
        user.token = userData.token;
        console.log('Logged in user:', user);

        this.user=user;

      })
      .catch(error => {

        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while registering the user.");
        }
      });
  }


}
