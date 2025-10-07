import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPageComponent implements OnInit {
  
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null
  }

  constructor(private http: HttpClient,
    private route: Router) {}

  ngOnInit(): void {
    
  }   

  onSubmit() {
    const {
      username, password, firstName, lastName
    } =  this.form

    console.log(this.form)

    this.http.post("https://localhost:7101/api/Login/register", this.form, {responseType: 
  'text'}).subscribe(data => {
      this.route.navigate(['/login'])
    })

  }
  

}
