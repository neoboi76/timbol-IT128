import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPostData } from '../components/post-detail/post-detail';
import { RegisterModel } from '../models/register.model';
import { AddPostModel } from '../models/add.model';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    isLoggedIn: boolean = false;
    public redirectUrl: string = "/posts";

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<LoginPostData>(
            "https://localhost:7101/api/Login/login",
            {username, password}
        );
    }

    /* register(registerData: any) {
        return this.http.post<RegisterModel>(
            "https://localhost:7101/api/Login/register",
            {registerData},
        );
    }
 */
    addPost(userId: number, title: string, body: string, dateCreated: Date, token: any) {
        return this.http.post<AddPostModel>(
            "https://localhost:7101/api/Post/add",
            {userId, title, body, dateCreated},
            {
                headers: {Authorization: `Bearer ${token}`},
                responseType: 'text' as 'json'
            }
        );
    }
}