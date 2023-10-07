import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/models/item';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredString: string, propName: string): any {
    if (value.length === 0 || filteredString == "") {
      return value;
    }
    const items: Item[] = []
    for (let item of value) {
      for (let i = 0; i < filteredString.length; i++) {
        if (item[propName][i] == filteredString[i]) {
          if (!items.includes(item)) {
            items.push(item);
          }
        }
      }
    }
    return items;
  }

}
