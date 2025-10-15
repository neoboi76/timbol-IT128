import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    private tokenStorageService: TokenStorageService,
    private auth: AuthServiceService, 
    private route: Router
  ) {}

  isMenuOpen = false;

  createPost() {
    this.route.navigate(['/create']);
  }

  goHome() {
    this.route.navigate(['/posts'], { fragment: 'canon' });
  }

  logOut() {
    this.tokenStorageService.signout();
    this.auth.isLoggedIn = false;
    setTimeout(() => this.route.navigate(['/login']), 1000);
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }



}
