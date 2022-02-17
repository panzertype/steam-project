import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  changeProfileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // this.authService.getAuth().subscribe((user) => {
    //   this.user = user;
    // });
    this.authService.appUser$.subscribe((appUser) => {
      console.log(appUser);
      this.user = appUser;
    });
  }

  onSubmit() {
    const user: User = {
      ...this.changeProfileForm.value,
    };
    this.updateUser(user.username, user.email);
  }

  updateUser(name?: string, email?: string) {
    this.authService.getAuth().subscribe(
      (user: any) => {
        if (user) {
          this.userService.updateUser(
            user.uid,
            user.email || email || '',
            user.displayName || name || ''
          );
        }
      },
      (error: { message: any }) => {
        alert(error.message);
      }
    );
  }
}
