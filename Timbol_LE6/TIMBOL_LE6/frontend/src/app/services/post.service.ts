import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private postsSource = new BehaviorSubject<Post[]>([]);
    posts$ = this.postsSource.asObservable();

    constructor(private http: HttpClient) {}

    loadPosts(): void {
        this.http.get<Post[]>('https://localhost:7101/api/post').subscribe({
            next: (data) => this.postsSource.next(data),
            error: (err) => console.error(err),
        });
    }

    getPostsSnapshot(): Post[] {
        return this.postsSource.getValue();
    }
}