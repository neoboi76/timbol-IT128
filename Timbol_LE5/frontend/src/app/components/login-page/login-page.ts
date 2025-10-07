import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService} from '../../services/auth.service';
import { LoginPostData } from '../post-detail/post-detail';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPageComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  }

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router) {}

    ngOnInit(): void {
      if (this.tokenStorage.getToken()) {
        this.authService.isLoggedIn = true;
        //this.router.navigate([this.authService.redirectUrl]);
      }
    }
  
  onSubmit() {
    const {username, password} = this.form;
    
    this.authService.login(username, password).subscribe({
      next: (data: LoginPostData) => {
        this.tokenStorage.saveToken(data.id_token);
        this.tokenStorage.saveUser(data.id)
        this.router.navigate([this.authService.redirectUrl]);
      },
      error: err => console.error(err)
    });

  }

}
