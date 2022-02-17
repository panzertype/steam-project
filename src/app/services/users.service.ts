import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private afs: AngularFirestore) {}

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

  getUser(id: string): Observable<User> {
    return this.afs.doc('/users/' + id).valueChanges() as Observable<User>;
  }
}
