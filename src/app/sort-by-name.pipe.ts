import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName',
})
export class SortByNamePipe implements PipeTransform {
  transform(games: any[], searchQuery: any, nameKey: string) {
    if (games !== null && searchQuery !== '') {
      return games.filter((game) =>
        game[`${nameKey}`].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return games;
  }
}
