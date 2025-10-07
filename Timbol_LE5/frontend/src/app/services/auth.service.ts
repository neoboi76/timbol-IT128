import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPostData } from '../components/post-detail/post-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "/posts";

  constructor(
    private http: HttpClient
  )
  {}

  login (username: string, password: string) {
    return this.http.post<LoginPostData>("https://localhost:7101/api/Login/login", {username, 
  password});
  }
}
