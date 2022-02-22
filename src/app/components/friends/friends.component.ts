import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../shared/services/users.service';

export interface SI {
  name: string;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  user: any = {};
  userFriends: any = [];
  searchInput: SI = { name: '' };

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private userService: UsersService
  ) {
    this.itemsCollection = afs.collection<any>('users');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    this.authService.appUser$.subscribe((appUser) => {
      this.user = appUser;

      for (let friendId of this.user.friends) {
        this.getUserFriend(friendId).subscribe((res) => {
          if (!this.userFriends.some(exists)) {
            return this.userFriends.push(res);
          }

          function exists(element: any) {
            return element.id === res.id;
          }
        });
      }
    });
  }

  addFriend(item: any) {
    const isEmpty = Object.keys(this.user).length === 0;

    if (!isEmpty) {
      for (let friendId of this.user.friends) {
        if (friendId === item.id) {
          return;
        }
      }
      this.user.friends.push(item.id);
      this.authService.getAuth().subscribe(
        (user: any) => {
          if (user) {
            this.userService.updateUserFriends(user.uid, this.user.friends);
          }
        },
        (error: { message: any }) => {
          alert(error.message);
        }
      );
    }
  }

  removeFriend(item: any) {
    const isEmpty = Object.keys(this.user).length === 0;

    if (!isEmpty) {
      for (let friendId of this.user.friends) {
        if (friendId === item.id) {
          this.user.friends = this.user.friends.filter(
            (el: any) => el !== item.id
          );
          this.userFriends = this.user.friends;

          this.authService.getAuth().subscribe(
            (user: any) => {
              if (user) {
                this.userService.updateUserFriends(user.uid, this.user.friends);
              }
            },
            (error: { message: any }) => {
              alert(error.message);
            }
          );
        }
      }
    }
  }

  getUserFriend(id: string): Observable<any> {
    return this.afs.doc('/users/' + id).valueChanges() as Observable<any>;
  }
}
