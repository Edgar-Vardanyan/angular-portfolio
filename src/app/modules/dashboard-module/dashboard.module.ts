import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPipe} from "../../shared/pipes";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersComponent} from "./dashboard/users/users.component";
import {PostsComponent} from "./dashboard/posts/posts.component";
import {TodosComponent} from "./dashboard/todos/todos.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CommentsComponent} from "./dashboard/comments/comments.component";
import {UserInfoComponent} from "./dashboard/users/user-info/user-info.component";
import {UserListComponent} from "./dashboard/users/user-list/user-list.component";
import {PostListComponent} from "./dashboard/posts/post-list/post-list.component";
import {PostInfoComponent} from "./dashboard/posts/post-info/post-info.component";
import {EditPostComponent} from "./dashboard/posts/edit-post/edit-post.component";
import {AddNewUserComponent} from "./dashboard/users/add-new-user/add-new-user.component";
import {CommentListComponent} from "./dashboard/comments/comment-list/comment-list.component";
import {CommentInfoComponent} from "./dashboard/comments/comment-info/comment-info.component";
import {EditCommentComponent} from "./dashboard/comments/edit-comment/edit-comment.component";


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    PostsComponent,
    CommentsComponent,
    TodosComponent,
    UserInfoComponent,
    UserListComponent,
    AddNewUserComponent,
    PostListComponent,
    PostInfoComponent,
    EditPostComponent,
    SearchPipe,
    CommentListComponent,
    CommentInfoComponent,
    EditCommentComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
