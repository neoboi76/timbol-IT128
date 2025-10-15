import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthServiceService,
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) {}

    canActivate(): boolean {
        if (this.tokenStorageService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}