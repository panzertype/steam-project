import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../shared/services/users.service';
import Validation from '../../shared/validators/matches.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+'),
      ]),
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );
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
