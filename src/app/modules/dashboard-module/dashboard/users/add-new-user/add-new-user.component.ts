import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../shared/models";
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
    private usersService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {

    this.createForm();
    if (this.editingMode) {
      this.getUsers();
    }
  }

  private createForm(): void {
    this.addForm = new FormGroup({
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

  private getUsers(): void {
    this.usersService.getUser(this.activatedRoute.snapshot.params.id)
      .subscribe(
        ((user: User) => {
          delete user.id;
          this.addForm.setValue(user);
        })
      );
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
      this.usersService.updateUser(addForm.value, this.activatedRoute.snapshot.params.id)
        .subscribe(() => {
          this.onCancel();
        });
    } else this.usersService.createUser(addForm.value)
      .subscribe(() => {
        this.onCancel();
      });

  }

  public onCancel(): void {
    this.router.navigate(['dashboard', 'users']);
  }


}
