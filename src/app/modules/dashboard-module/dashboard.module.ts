import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPipe} from "../../shared/pipes";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersComponent} from "./components/dashboard/users/users.component";
import {PostsComponent} from "./components/dashboard/posts/posts.component";
import {TodosComponent} from "./components/dashboard/todos/todos.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CommentsComponent} from "./components/dashboard/comments/comments.component";
import {UserInfoComponent} from "./components/dashboard/users/user-info/user-info.component";
import {UserListComponent} from "./components/dashboard/users/user-list/user-list.component";
import {PostListComponent} from "./components/dashboard/posts/post-list/post-list.component";
import {PostInfoComponent} from "./components/dashboard/posts/post-info/post-info.component";
import {EditPostComponent} from "./components/dashboard/posts/edit-post/edit-post.component";
import {AddNewUserComponent} from "./components/dashboard/users/add-new-user/add-new-user.component";
import {CommentListComponent} from "./components/dashboard/comments/comment-list/comment-list.component";
import {CommentInfoComponent} from "./components/dashboard/comments/comment-info/comment-info.component";
import {EditCommentComponent} from "./components/dashboard/comments/edit-comment/edit-comment.component";


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
