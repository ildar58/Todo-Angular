import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDto} from '../interfaces/task-dto.interface';
import {Task} from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _host = `${environment.host}/items`;

  private _tasks$$: BehaviorSubject<TaskDto[]> = new BehaviorSubject<TaskDto[]>([]);
  public tasks$: Observable<TaskDto[]> = this._tasks$$.asObservable();

  constructor(private readonly _http: HttpClient) {}

  public get(): void {
    this._http
      .get<TaskDto[]>(this._host)
      .toPromise()
      .then(tasks => {
        this._tasks$$.next(tasks);
      });
  }

  public post(task: Task): void {
    this._http
      .post<TaskDto>(this._host, task)
      .toPromise()
      .then(task => {
        const currentTasks = this._tasks$$.getValue();

        this._tasks$$.next([...currentTasks, task]);
      });
  }

  public put(task: TaskDto): void {
    this._http
      .put<TaskDto>(`${this._host}/${task.id}`, task)
      .toPromise()
      .then(newTask => {
        const currentTasks = this._tasks$$.getValue();
        const index = currentTasks.findIndex(item => item.id === task.id);

        currentTasks.splice(index, 1, newTask);
        this._tasks$$.next(currentTasks);
      });
  }

  public delete(id: number): void {
    this._http
      .delete<TaskDto>(`${this._host}/${id}`)
      .toPromise()
      .then(() => {
        const currentTasks = this._tasks$$.getValue();
        const index = currentTasks.findIndex(item => item.id === id);

        currentTasks.splice(index, 1);
        this._tasks$$.next(currentTasks);
      });
  }
}
