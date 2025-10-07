import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-posts',
  imports: [CommonModule],
  templateUrl: './list-posts.html',
  styleUrl: './list-posts.css'
})

export class ListPostsComponent {
  posts?: Post[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() : void {
    this.initData();
  }
  
  initData(): void{
    this.http.get<Post[]>('https://Localhost:7101/api/post')
    .subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
      }
    })
  }

}
