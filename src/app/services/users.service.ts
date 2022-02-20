import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private afs: AngularFirestore) {}

  createUser(id: string, email: string, username: string) {
    return this.afs
      .doc('/users/' + id)
      .set(
        {
          username: username,
          email: email,
          id: id,
          library: [],
          friends: [],
        },
        { merge: true }
      )
      .then(() => {
        console.log('user saved successfully');
      })
      .catch((reason: any) => {
        console.log('user was not saved', reason);
      });
  }

  updateUser(id: string, email: string, username: string) {
    return this.afs
      .doc('/users/' + id)
      .set(
        {
          username: username,
          email: email,
        },
        { merge: true }
      )
      .then(() => {
        console.log('user saved successfully');
      })
      .catch((reason: any) => {
        console.log('user was not saved', reason);
      });
  }

  updateUserFriends(id: string, friends: any[]) {
    return this.afs
      .doc('/users/' + id)
      .set(
        {
          friends: friends,
        },
        { merge: true }
      )
      .then(() => {
        console.log('user saved successfully');
      })
      .catch((reason: any) => {
        console.log('user was not saved', reason);
      });
  }

  updateUserLibrary(id: string, library: any[]) {
    return this.afs
      .doc('/users/' + id)
      .set(
        {
          library: library,
        },
        { merge: true }
      )
      .then(() => {
        console.log('user saved successfully');
      })
      .catch((reason: any) => {
        console.log('user was not saved', reason);
      });
  }

  getUser(id: string): Observable<User> {
    return this.afs.doc('/users/' + id).valueChanges() as Observable<User>;
  }
}
