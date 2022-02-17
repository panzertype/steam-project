import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPrice',
})
export class SortByPricePipe implements PipeTransform {
  transform(games: any, maxPrice: any, ...args: unknown[]) {
    if (games) {
      const filteredGames = [];
      for (let i = 0; i < games.length; i++) {
        if (games[i].price <= maxPrice) {
          filteredGames.push(games[i]);
        }
      }
      return (games = filteredGames);
    }
    return games;
  }
}
// import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy } from 'lodash';

// @Pipe({ name: 'sortBy' })
// export class SortByPipe implements PipeTransform {

//   transform(value: any[], order = '', column: string = ''): any[] {
//     if (!value || order === '' || !order) { return value; } // no array
//     if (value.length <= 1) { return value; } // array with only one item
//     if (!column || column === '') {
//       if(order==='asc'){return value.sort()}
//       else{return value.sort().reverse();}
//     } // sort 1d array
//     return orderBy(value, [column], [order]);
//   }
// }
