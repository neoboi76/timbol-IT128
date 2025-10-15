import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service';
import { NavComponent } from '../nav.component/nav.component';

@Component({
    selector: 'app-list-posts',
    imports: [CommonModule, RouterLink, NavComponent],
    templateUrl: './list-posts.html',
    styleUrl: './list-posts.css'
})
export class ListPostsComponent {
    isMenuOpen = false;
    posts?: Post[] = [];

    constructor(
        private http: HttpClient,
        private tokenStorageService: TokenStorageService,
        private auth: AuthServiceService,
        private route: Router
    ) {}

    ngOnInit() : void {
        this.initData();
    }


    initData(): void {
        this.http.get<Post[]>('https://Localhost:7101/api/post')
            .subscribe({
                next: (data: Post[]) => {
                    this.posts = data;
                    console.log(this.posts);
                },
                error: err => {
                    console.error(err);
                }
            })
    }

}