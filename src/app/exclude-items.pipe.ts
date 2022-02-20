import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeItems',
})
export class ExcludeItemsPipe implements PipeTransform {
  transform(games: any[], filterQuery: any[], ...args: unknown[]) {
    if (games) {
      if (filterQuery?.length === 0) {
        return games;
      }
      const filteredGames = [];
      for (let game of games) {
        if (!filterQuery?.includes(game.id)) {
          filteredGames.push(game);
        }
      }
      return (games = filteredGames);
    }
    return games;
  }
}
