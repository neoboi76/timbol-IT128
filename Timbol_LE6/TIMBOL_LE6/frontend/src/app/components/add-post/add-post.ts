import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { TokenStorageService } from '../../services/token-storage.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth.service';
import { AddPostModel } from '../../models/add.model';
import { NavComponent } from "../nav.component/nav.component";

@Component({
    selector: 'app-add-post',
    imports: [FormsModule, QuillModule, CommonModule, NavComponent],
    templateUrl: './add-post.html',
    styleUrl: './add-post.css'
})
export class AddPostComponent {
    isMenuOpen = false;
    addPost: any;

    constructor(
        private http: HttpClient,
        private route: Router,
        private tokenStorage: TokenStorageService,
        private auth: AuthServiceService
    ) {
        this.addPost = {
            userId: Number(this.tokenStorage.getUser()),
            title: '',
            body: '',
            dateCreated: new Date()
        };
    }


    quillConfig = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            [{ header: [1, 2, 3, false] }],
            [{ color: [] }, { background: [] }],
            ['clean']
        ]
    };

    submitPost() {
        const token = this.tokenStorage.getToken();
        const { userId, title, body, dateCreated } = this.addPost;

        this.auth.addPost(userId, title, body, dateCreated, token).subscribe({
            next: (data) => {
                console.log(data);
                setTimeout(() => this.route.navigate([this.auth.redirectUrl]), 1000);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

}
