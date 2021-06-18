import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskDto} from '../../common/interfaces/task-dto.interface';
import {TodoService} from '../../common/services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public readonly tasks$: Observable<TaskDto[]> = this._todoService.tasks$;

  constructor(private readonly _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.loadTasks();
  }
}
