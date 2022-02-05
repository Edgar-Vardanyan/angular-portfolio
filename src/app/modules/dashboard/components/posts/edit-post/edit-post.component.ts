import {Observable} from "rxjs";
import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../../../shared/services";
import {DeactivateGuard} from "../../../../../shared/guards";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, DeactivateGuard {
  public editForm: FormGroup;
  public editingMode: boolean = this.activatedRoute.snapshot.params.id;
  public post: Post;

  constructor(
    private router: Router,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.createForm()
    this.ifEditingMode()

  }

  public onSubmit(addForm: FormGroup): void {
    this.editForm.markAsPristine()

    if (this.editingMode) {

      this.updatePost(addForm.value, this.activatedRoute.snapshot.params.id)
    } else {
      this.createPost(addForm.value)
    }

  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.editForm.dirty) {
      return true;
    }
    return confirm('Discard changes?');
  }

  public onCancel(): void {
    this.router.navigate(['dashboard', 'posts']);
  }

  private createForm(): void {

    this.editForm = new FormGroup({
      id: new FormControl(this.activatedRoute.snapshot.params.id),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });

  }

  private ifEditingMode(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.editingMode = true;
      this.getPost(this.activatedRoute.snapshot.params.id)
    }
  }

  private getPost(postId: number): void {
    this.postService.getPost(postId)
      .subscribe(
        ((post: Post) => {
          this.editForm.patchValue(post);
        })
      );
  }

  private updatePost(data: Post, postId: number): void {
    this.postService.updatePost(data, postId)
      .subscribe(() => {
        this.onCancel();
      });
  }

  private createPost(data: Post): void {
    this.postService.createPost(data)
      .subscribe(() => {
        this.onCancel();
      });
  }


}
