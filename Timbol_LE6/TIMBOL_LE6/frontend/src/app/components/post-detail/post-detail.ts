import { Component, Pipe } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthServiceService } from '../../services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import { PostService } from '../../services/post.service';
import { NavComponent } from "../nav.component/nav.component";

@Component({
    selector: 'app-post-detail',
    imports: [UpperCasePipe, CommonModule, FormsModule, RouterLink, NavComponent],
    templateUrl: './post-detail.html',
    styleUrl: './post-detail.css'
})
export class PostDetailComponent {
    isMenuOpen = false;
    private routeSub: Subscription = new Subscription();
    private id: number = 0;
    post?: Post;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private tokenStorage: TokenStorageService,
        private auth: AuthServiceService,
        private sanitizer: DomSanitizer,
        private postService: PostService
    ) {}

    sanitizeQuill(html?: string): SafeHtml {
        const clean = html ? DOMPurify.sanitize(html.replace(/&nbsp;/g, ' ').replace(/style="[^"]*"/g, '')) : '';
        return this.sanitizer.bypassSecurityTrustHtml(clean);
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.initData();
        })
    }

    initData(): void {
        this.http.get<Post>('https://localhost:7101/api/post/' + this.id).subscribe({
            next: (data: Post) => {
                this.post = data;
                console.log(this.post);
            },
            error: err => {
                console.error(err);
            }
        })
    }
}

export interface LoginPostData {
    id_token: string;
    id: number;
}