import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    username: new FormControl('', [Validators.required]),
  });
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const newUser: User = {
      ...this.signUpForm.value,
    };

    this.auth.register(newUser.email, newUser.password);
    this.createUser(newUser?.username);
  }

  createUser(name?: string) {
    this.auth.getAuth().subscribe(
      (user) => {
        if (user) {
          this.userService.createUser(
            user.uid,
            user.email || '',
            user.displayName || name || ''
          );
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
}
