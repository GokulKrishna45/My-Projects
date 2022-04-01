import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostItemsModel } from 'src/app/view-model/post-items.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  tags: string[] = [];
  postForm: FormGroup;
  loggedInData: any;
  posts: PostItemsModel[];
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loggedInData = this.router.getCurrentNavigation()?.extras.state;

  }

  ngOnInit(): void {
    this.getPosts();
    this.postForm = this.fb.group({
      id: null,
      name: [null, Validators.required],
      tag: [null, Validators.required],
      created_at: null
    });
  }
  getPosts() {
    this.posts = this.authService.getPosts();
  }
  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.postForm.value.tag;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.postForm.controls['tag'].setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    this.tags.splice(-1);
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.postForm);
    if (this.postForm.value.name && this.tags.length) {
      let post = this.getPostData();
      this.authService.addPost(post);
      this.postForm.reset();
      this.tags = [];
      this.isSubmitted = false;

    }
  }
  getPostData(): PostItemsModel {
    let id = JSON.parse(localStorage.getItem('Posts') || "{}").length + 1;
    return {
      id: id,
      text: this.postForm.value.name,
      created_at: formatDate(new Date(), 'EE MMM dd HH:mm:ss ZZ YYYY', 'en'),
      Tags: this.tags,
      is_complete: true

    }
  }
  onLogout() {
    this.router.navigate(['/login']);
  }

}
