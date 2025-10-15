import { Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { LoginPageComponent } from './components/login-page/login-page';
import { RegisterPageComponent } from './components/register-page/register-page';
import { AddPostComponent } from './components/add-post/add-post';
import { AuthGuard } from './services/auth-gaurd';

export const routes: Routes = [
    { path: '', component: LoginPageComponent, canActivate: [AuthGuard]},
    { path: 'posts', component: ListPostsComponent},
    { path: 'posts/:id', component: PostDetailComponent },
    { path: 'login', component: LoginPageComponent},
    { path: 'register', component: RegisterPageComponent},
    { path: 'create', component: AddPostComponent }
]; 
