import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../shared/services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  public addForm: FormGroup;
  public editingMode: boolean = this.activatedRoute.snapshot.params.id;
  public user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {

    this.createForm();
    this.ifEditMode();

  }

  public canDeactivate(): boolean {
    if (!this.addForm.dirty) {
      return true;
    }

    return confirm('Discard changes?');
  }

  public onSubmit(addForm: FormGroup) {
    this.addForm.markAsPristine()
    if (this.editingMode) {
      this.updateUser(addForm.value, this.activatedRoute.snapshot.params.id)
    } else {
      this.createUser(addForm.value)
    }

  }

  public onCancel(): void {
    this.router.navigate(['dashboard', 'users']);
  }

  private ifEditMode(): void {
    if (this.editingMode) {
      this.getUser();
    }
  }

  private createForm(): void {
    this.addForm = new FormGroup({
      id: new FormControl(this.activatedRoute.snapshot.params.id),
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        suite: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required),
        geo: new FormGroup({
          lat: new FormControl('', Validators.required),
          lng: new FormControl('', Validators.required)
        })
      }),
      phone: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      company: new FormGroup({
        name: new FormControl('', Validators.required),
        catchPhrase: new FormControl('', Validators.required),
        bs: new FormControl('', Validators.required),
      })
    });
  }

  private getUser(): void {
    this.userService.getUser(this.activatedRoute.snapshot.params.id)
      .subscribe(
        ((user: User) => {
          this.addForm.patchValue(user);
        })
      );
  }

  private updateUser(data: User, userId: number): void {
    this.userService.updateUser(data, userId)
      .subscribe(() => {
        this.onCancel();
      });
  }

  private createUser(data: User): void {
    this.userService.createUser(data)
      .subscribe(() => {
        this.onCancel();
      });
  }


}
