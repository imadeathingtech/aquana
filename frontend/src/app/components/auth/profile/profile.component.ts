import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'aquana-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private userService: UserService) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      nickname: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      user_id: new FormControl(''),
    });

    this.auth.user$.subscribe((user) => {
      console.log(user);
      this.form.controls['nickname'].setValue(user?.nickname);
      this.form.controls['name'].setValue(user?.name);
      this.form.controls['email'].setValue(user?.email);
      this.form.controls['user_id'].setValue(user?.sub);
    });
  }
  submit() {
    console.log(this.form.value);
    this.userService.updateUser(this.form.value).subscribe((user) => {
      console.log(user);
    });
  }
}
