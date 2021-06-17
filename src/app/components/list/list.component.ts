import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskDto} from '../../common/interfaces/task-dto.interface';
import {ApiService} from '../../common/services/api.service';
import {priorityLevelsNumber} from '../../common/dicts/priority-level-num';
import {StatusType} from '../../common/enums/status-type.enum';
import {AppComponentClass} from '../../common/classes/app-component.class';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends AppComponentClass implements OnInit {
  private readonly _tasks$: Observable<TaskDto[]>;
  public tasks: TaskDto[] = [];

  @Input()
  public filterProps;

  constructor(private readonly _api: ApiService) {
    super();
    this._tasks$ = this._api.tasks$;
  }

  ngOnInit(): void {
    this._api.get();
    this._observeSafe(this._tasks$)
      .subscribe(tasks => this.tasks = tasks.filter(this.filterTask).sort(this.sortTask));
  }

  filterTask = task => {
    return this.filterByPriority(task) && this.filterByStatus(task) && this.filterByText(task);
  }

  filterByPriority = task => {
    const priorityFilter = this.filterProps.priority;

    if (priorityFilter === 'all') {
      return true;
    } else {
      return priorityFilter === task.priority;
    }
  }

  filterByStatus = task => {
    const statusFilter = this.filterProps.statusTypes;
    const isActive = statusFilter[StatusType.Active] && task.status === StatusType.Active;
    const isFailed = statusFilter[StatusType.Failed] && task.status === StatusType.Failed;
    const isSuccess = statusFilter[StatusType.Success] && task.status === StatusType.Success;

    return isActive || isFailed || isSuccess;
  }

  public sortTask = (a: TaskDto, b: TaskDto) => {
      if (this.filterProps.sortByDate !== '') {
        if (a.date < b.date) {
          return this.filterProps.sortByDate === 'asc' ? -1 : 1;
        }
        if (a.date > b.date) {
          return this.filterProps.sortByDate === 'asc' ? 1 : -1;
        }
        return 0;
      }

      if (this.filterProps.sortByPriority === '') {
        if (priorityLevelsNumber[a.priority] < priorityLevelsNumber[b.priority]) {
          return this.filterProps.sortByPriority === 'asc' ? -1 : 1;
        }
        if (priorityLevelsNumber[a.priority] > priorityLevelsNumber[b.priority]) {
          return this.filterProps.sortByPriority === 'asc' ? 1 : -1;
        }
        return 0;
      }

      return 0;
  }

  filterByText = task => {
    const textFilter = this.filterProps.text;

    if (!textFilter) {
      return true;
    } else {
      return (task.text.indexOf(textFilter) !== -1);
    }
  }
}
