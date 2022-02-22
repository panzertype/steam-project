import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByGenre',
  pure: false,
})
export class SortByGenrePipe implements PipeTransform {
  transform(games: any[], filterQuery: any[], ...args: unknown[]) {
    if (games) {
      if (filterQuery.length === 0) {
        return games;
      }
      const filteredGames = [];
      for (let game of games) {
        if (filterQuery.includes(game.genre)) {
          filteredGames.push(game);
        }
      }
      return (games = filteredGames);
    }
    return games;
  }
}
