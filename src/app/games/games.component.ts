// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-games',
//   templateUrl: './games.component.html',
//   styleUrls: ['./games.component.scss'],
// })
// export class GamesComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Game } from '../game';

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
export class GamesComponent {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  isActive?: boolean;

  searchInput: SI = { name: '', age: null, genre: [], price: 1000 };

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('games');
    this.items = this.itemsCollection.valueChanges();
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
}
