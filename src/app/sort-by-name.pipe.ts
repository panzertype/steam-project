import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName',
})
export class SortByNamePipe implements PipeTransform {
  transform(games: any[], searchQuery: any, ...args: unknown[]) {
    if (games !== null) {
      return games.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return games;
  }
}
