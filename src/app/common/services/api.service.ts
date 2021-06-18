import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _host = `${environment.host}/items`;

  constructor(private readonly _http: HttpClient) {}

  public get<T>(): Observable<T> {
    return this._http.get<T>(this._host);
  }

  public post<T, G>(body: T): Observable<G> {
    return this._http.post<G>(this._host, body);
  }

  public put<T>(id: number, body: T): Observable<T> {
    return this._http.put<T>(`${this._host}/${id}`, body);
  }

  public delete<T>(id: number): Observable<T> {
    return this._http.delete<T>(`${this._host}/${id}`);
  }
}
