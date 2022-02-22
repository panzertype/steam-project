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
  age: number | null;
  genre: any;
  price: number;
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  isActive?: boolean;

  searchInput: SI = { name: '', age: null, genre: [], price: 1000 };
  event: any;
  user: any = {};

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.itemsCollection = afs.collection<any>('games');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    this.authService.appUser$.subscribe((appUser) => {
      this.user = appUser;
      console.log(this.user);
    });
  }

  toggleFilter(toggleableFilter: string) {
    if (this.searchInput.genre.includes(toggleableFilter)) {
      this.searchInput.genre = this.searchInput.genre.filter(
        (el: string) => el !== toggleableFilter
      );
    } else {
      this.searchInput.genre.push(toggleableFilter);
    }
  }

  addToLibrary(item: any) {
    const isEmpty = Object.keys(this.user).length === 0;

    if (!isEmpty) {
      console.log(this.user);
      for (let gameId of this.user.library) {
        if (gameId === item.id) {
          return;
        }
      }
      this.user.library.push(item.id);
      this.authService.getAuth().subscribe(
        (user: any) => {
          if (user) {
            this.userService.updateUserLibrary(user.uid, this.user.library);
          }
        },
        (error: { message: any }) => {
          alert(error.message);
        }
      );
    }
  }
}
