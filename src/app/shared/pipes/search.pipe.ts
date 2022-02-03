import {Todo} from "../models";
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(value: Todo[], searchText: string) {
    const filteredArr: Todo[] = [];
    if (searchText === '') {
      return value;
    }
    for (let todo of value) {
      if (todo.title.toLowerCase().startsWith(searchText.toLowerCase())) {
        filteredArr.push(todo);
      }
    }
    return filteredArr;
  }

}
