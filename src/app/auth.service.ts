import { Injectable } from '@angular/core';
import * as users from '../assets/user.json'
import * as posts from '../assets/posts.json'
import { LoginModel } from './view-model/login.model';
import { PostItemsModel } from './view-model/post-items.model';
import { PostModel } from './view-model/post.model';
import { UserModel } from './view-model/users.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: UserModel[] = (users as any).default;
  posts: PostModel = (posts as any).default;
  constructor() { }

  getLoggedInUserData(loginModel: LoginModel) {
    console.log(this.users);
    const user = this.users.find((item: any) => item.user === loginModel.username && item.password === loginModel.password);
    return user;

  }
  getPosts() {
    console.log(this.posts.items);
    if(localStorage.getItem('Posts')){
      return  JSON.parse(localStorage.getItem('Posts') || "{}");
    }
    else{
      return localStorage.setItem('Posts',JSON.stringify(this.posts.items));

    }
  }
  addPost(post: PostItemsModel) {
    let postArray = [];
    if (localStorage.getItem('Posts')) {
      postArray = JSON.parse(localStorage.getItem('Posts') || '{}');
      postArray = [post, ...postArray];

    }
    else{
      postArray = [post];
    }
     localStorage.setItem('Posts',JSON.stringify(postArray));


  }
}
