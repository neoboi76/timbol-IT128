import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.css']
})
export class RegisterPageComponent implements OnInit {
  
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) return;

     const formData = this.registerForm.value;

     this.http.post("https://localhost:7101/api/Login/register", formData, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.successMessage = 'Account created successfully!';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
 
  }
}

/*   const {firstName, lastName, userName, password} = this.registerForm.value;

      this.auth.register(firstName, lastName, userName, password).subscribe({
        next: () => {
          this.successMessage = 'Account created successfully!';
          setTimeout(() => this.router.navigate(['/login']), 1000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
  } 
  } */