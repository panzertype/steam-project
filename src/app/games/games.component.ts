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

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  searchInput: Game = { name: '', age: null, price: null };
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('games');
    this.items = this.itemsCollection.valueChanges();
  }
}
