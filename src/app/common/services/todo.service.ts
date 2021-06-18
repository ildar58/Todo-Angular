import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDto} from '../interfaces/task-dto.interface';
import {ApiService} from './api.service';
import {Task} from '../interfaces/task.interface';
import {StatusType} from '../enums/status-type.enum';
import {priorityLevelsNumber} from '../dicts/priority-level-num';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _tasks$$: BehaviorSubject<TaskDto[]> = new BehaviorSubject<TaskDto[]>([]);
  private _filteredTasks$$: BehaviorSubject<TaskDto[]> = new BehaviorSubject<TaskDto[]>([]);
  public cachedConditions: any = {};
  public tasks$: Observable<TaskDto[]> = this._filteredTasks$$.asObservable();

  constructor(private readonly apiService: ApiService) {}

  public loadTasks(): void {
    this.apiService
      .get<TaskDto[]>()
      .toPromise()
      .then(tasks => {
        this._tasks$$.next(tasks);
        this.filterTask();
      });
  }

  public addTask(task: Task): void {
    this.apiService
      .post<Task, TaskDto>(task)
      .toPromise()
      .then(task => {
        const currentTasks = this._tasks$$.getValue();

        this._tasks$$.next([...currentTasks, task]);
      });
  }

  public updateTask(task: TaskDto): void {
    this.apiService
      .put(task.id, task)
      .toPromise()
      .then(newTask => {
        const currentTasks = this._tasks$$.getValue();
        const index = currentTasks.findIndex(item => item.id === task.id);

        currentTasks.splice(index, 1, newTask);
        this._tasks$$.next(currentTasks);
        this.filterTask();
      });
  }

  public deleteTask(id: number): void {
    this.apiService
      .delete<TaskDto>(id)
      .toPromise()
      .then(() => {
        const currentTasks = this._tasks$$.getValue();
        const index = currentTasks.findIndex(item => item.id === id);

        currentTasks.splice(index, 1);
        this._tasks$$.next(currentTasks);
      });
  }

  public filterTask(conditions?: any): void {
    this.cachedConditions = conditions || this.cachedConditions;

    const filterByPriority = task => {
      const priorityFilter = this.cachedConditions.priority;

      if (priorityFilter === 'all') {
        return true;
      } else {
        return priorityFilter === task.priority;
      }
    };

    const filterByStatus = task => {
      const statusFilter = this.cachedConditions.statusTypes;
      const isActive = statusFilter[StatusType.Active] && task.status === StatusType.Active;
      const isFailed = statusFilter[StatusType.Failed] && task.status === StatusType.Failed;
      const isSuccess = statusFilter[StatusType.Success] && task.status === StatusType.Success;

      return isActive || isFailed || isSuccess;
    };

    const sortTask = (a: TaskDto, b: TaskDto) => {
      if (this.cachedConditions.sortByDate !== '') {
        if (a.date < b.date) {
          return this.cachedConditions.sortByDate === 'asc' ? -1 : 1;
        }
        if (a.date > b.date) {
          return this.cachedConditions.sortByDate === 'asc' ? 1 : -1;
        }
        return 0;
      }

      if (this.cachedConditions.sortByPriority === '') {
        if (priorityLevelsNumber[a.priority] < priorityLevelsNumber[b.priority]) {
          return this.cachedConditions.sortByPriority === 'asc' ? -1 : 1;
        }
        if (priorityLevelsNumber[a.priority] > priorityLevelsNumber[b.priority]) {
          return this.cachedConditions.sortByPriority === 'asc' ? 1 : -1;
        }
        return 0;
      }

      return 0;
    };

    const filterByText = task => {
      const textFilter = this.cachedConditions.text;

      if (!textFilter) {
        return true;
      } else {
        return task.text.indexOf(textFilter) !== -1;
      }
    };

    const filterTask = task => {
      return filterByPriority(task) && filterByStatus(task) && filterByText(task);
    };

    const tasks = this._tasks$$.getValue();
    this._filteredTasks$$.next(tasks.filter(filterTask).sort(sortTask));
  }
}
