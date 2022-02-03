import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostsComponent} from "./dashboard/posts/posts.component";
import {UsersComponent} from "./dashboard/users/users.component";
import {TodosComponent} from "./dashboard/todos/todos.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardGuard, DeactivateGuard} from "../../shared/guards";
import {CommentsComponent} from "./dashboard/comments/comments.component";
import {UserListComponent} from "./dashboard/users/user-list/user-list.component";
import {UserInfoComponent} from "./dashboard/users/user-info/user-info.component";
import {PostListComponent} from "./dashboard/posts/post-list/post-list.component";
import {EditPostComponent} from "./dashboard/posts/edit-post/edit-post.component";
import {PostInfoComponent} from "./dashboard/posts/post-info/post-info.component";
import {AddNewUserComponent} from "./dashboard/users/add-new-user/add-new-user.component";
import {CommentListComponent} from "./dashboard/comments/comment-list/comment-list.component";
import {EditCommentComponent} from "./dashboard/comments/edit-comment/edit-comment.component";
import {CommentInfoComponent} from "./dashboard/comments/comment-info/comment-info.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [

      {path: '', redirectTo: 'users', pathMatch: 'full'},

      {
        path: 'users', component: UsersComponent,
        children: [
          {path: '', component: UserListComponent},
          {path: 'add-new-user', component: AddNewUserComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/edit-user', component: AddNewUserComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/user-info', component: UserInfoComponent},
        ]
      },

      {
        path: 'posts', component: PostsComponent,
        children: [
          {path: '', component: PostListComponent},
          {path: 'add-new-post', component: EditPostComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/edit-post', component: EditPostComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/post-info', component: PostInfoComponent}
        ]
      },

      {
        path: 'comments', component: CommentsComponent,
        children: [
          {path: '', component: CommentListComponent},
          {path: 'add-new-comment', component: EditCommentComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/edit-comment', component: EditCommentComponent, canDeactivate: [DeactivateGuard]},
          {path: ':id/comment-info', component: CommentInfoComponent}
        ]
      },

      {path: 'todos', component: TodosComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
