import {Todo} from "../interfaces";
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(value: Todo[], searchText: string) {

    if (searchText) {
      return value.filter((todo: Todo) => {
        return todo.title.toLowerCase().startsWith(searchText.toLowerCase())
      })
    }
    return value
  }

}
