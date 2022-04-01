import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit {
  posts: any[];
  show: number = 10;
  loggedInData: any;
  constructor(private authService: AuthService, private router: Router) {
    this.loggedInData = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    this.posts = this.authService.getPosts();
  }
  createPost() {

    this.router.navigate(['/create-post'], { state: this.loggedInData });

  }
  showMore() {
    this.show += 10;
  }
  onLogout() {
    this.router.navigate(['/login']);

  }


}
