import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface SI {
  name: string;
  age: number | null;
  genre: any;
  price: number;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  user: any = {};
  userGames: any = [];
  searchInput: SI = { name: '', age: null, genre: [], price: 1000 };

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.authService.appUser$.subscribe((appUser) => {
      this.user = appUser;

      console.log('user library', this.user.library);

      for (let game of this.user.library) {
        this.getUserGame(game).subscribe((res) => {
          console.log('res', res);

          if (!this.userGames.some(exists)) {
            return this.userGames.push(res);
          }

          function exists(element: any) {
            return element.id === res.id;
          }
        });
      }

      console.log('user games', this.userGames);
    });
  }

  getUserGame(id: string): Observable<any> {
    return this.afs.doc('/games/' + id).valueChanges() as Observable<any>;
  }
}
