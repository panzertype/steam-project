import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UsersService
  ) {}

  getAuth() {
    return this.fireauth.authState.pipe(map((auth) => auth));
  }

  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['profile']);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            alert(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            alert('Password is not strong enough.');
            break;
          case 'auth/network-request-failed':
            alert("You're are currently offline");
            break;
          default:
            alert(error.message);
            break;
        }
      });
  }

  register(email: string, password: string) {
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registration successful');
        this.router.navigate(['profile']);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            alert(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            alert(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            break;
          case 'auth/network-request-failed':
            alert("You're are currently offline");
            break;
          default:
            alert(error.message);
            break;
        }
      });
  }

  logOut() {
    return this.fireauth.signOut();
  }

  get appUser$(): Observable<User> {
    return this.getAuth().pipe(
      switchMap((user) => this.userService.getUser(user?.uid as string))
    );
  }
}
