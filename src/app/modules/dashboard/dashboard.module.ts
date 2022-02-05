import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPipe} from "../../shared/pipes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersComponent} from "./components/users/users.component";
import {PostsComponent} from "./components/posts/posts.component";
import {TodosComponent} from "./components/todos/todos.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {CommentsComponent} from "./components/comments/comments.component";
import {UserInfoComponent} from "./components/users/user-info/user-info.component";
import {UserListComponent} from "./components/users/user-list/user-list.component";
import {PostListComponent} from "./components/posts/post-list/post-list.component";
import {PostInfoComponent} from "./components/posts/post-info/post-info.component";
import {EditPostComponent} from "./components/posts/edit-post/edit-post.component";
import {AddNewUserComponent} from "./components/users/add-new-user/add-new-user.component";
import {CommentListComponent} from "./components/comments/comment-list/comment-list.component";
import {CommentInfoComponent} from "./components/comments/comment-info/comment-info.component";
import {EditCommentComponent} from "./components/comments/edit-comment/edit-comment.component";


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
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
