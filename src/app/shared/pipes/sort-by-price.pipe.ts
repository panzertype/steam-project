import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPrice',
})
export class SortByPricePipe implements PipeTransform {
  transform(games: any, maxPrice: any, anyPriceIf: any, ...args: unknown[]) {
    if (anyPriceIf === maxPrice) return games;
    if (games !== null) {
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
