import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service';
import { LoginPostData } from '../post-detail/post-detail';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login-page.html',
    styleUrls: ['./login-page.css']
})
export class LoginPageComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    errorMessage = '';

    constructor(
        private authService: AuthServiceService,
        private tokenStorage: TokenStorageService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.authService.isLoggedIn = true;
            this.router.navigate([this.authService.redirectUrl]);
        }

        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(4)]],  
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        this.errorMessage = '';

        if (this.loginForm.invalid) return;

        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
            next: (data: LoginPostData) => {
                this.tokenStorage.saveToken(data.id_token);
                this.tokenStorage.saveUser(data.id);
                this.authService.isLoggedIn = true;
                setTimeout(() => this.router.navigate([this.authService.redirectUrl]), 1000);
            },
            error: err => {
                console.error(err);
                this.errorMessage = 'Invalid username or password.';
            }
        });
    }
}