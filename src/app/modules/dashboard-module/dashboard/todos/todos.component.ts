import {Subject} from "rxjs";
import {Todo} from "../../../../shared/models";
import {TodoService} from "../../../../shared/services";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  public todos: Todo[] = [];
  public searchText: string = '';
  public destroy$ = new Subject<void>();

  constructor(
    private todosService: TodoService
  ) {
  }

  public ngOnInit(): void {
    this.getTodos();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public getTodos(): void {
    this.todosService.getTodos()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }


}
