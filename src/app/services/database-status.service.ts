import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError, timer} from 'rxjs';
import {catchError, tap, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

export enum DatabaseStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHECKING = 'checking',
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseStatusService {

  private apiUrl = environment.apiUrl;
  private statusSubject = new BehaviorSubject<DatabaseStatus>(DatabaseStatus.CHECKING);
  public status$ = this.statusSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.checkDatabaseStatus();
  }

  checkDatabaseStatus() {
    this.statusSubject.next(DatabaseStatus.CHECKING);

    this.httpClient.get<any>(`${this.apiUrl}/api/health`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Si l'erreur est liée à la base de données, marquer comme hors ligne
          this.statusSubject.next(DatabaseStatus.OFFLINE);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => {
          this.statusSubject.next(DatabaseStatus.ONLINE);
        },
        error: () => {
        }
      });
  }

  retryConnection(): Observable<any> {
    this.statusSubject.next(DatabaseStatus.CHECKING);

    return this.httpClient.get<any>(`${this.apiUrl}/api/health`)
      .pipe(
        retry({count: 3, delay: 2000}),
        tap(() => {
          this.statusSubject.next(DatabaseStatus.ONLINE);
        }),
        catchError((error) => {
          this.statusSubject.next(DatabaseStatus.OFFLINE);
          return throwError(() => error);
        })
      );
  }
}
