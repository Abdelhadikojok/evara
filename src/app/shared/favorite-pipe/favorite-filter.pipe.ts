import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/models/item';

@Pipe({
  name: 'favoriteFilter'
})
export class FavoriteFilterPipe implements PipeTransform {

  transform(value: any, favoriteStutes: boolean): any {
    const items: Item[] = []
    if (!favoriteStutes) {
      return value;
    }
    for (let item of value) {
      if (item.favorite) {
        items.push(item)
      }
    }
    return items;
  }

}
