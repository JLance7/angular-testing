import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES)
    // this.messageService.addMessage('HeroService: fetched heroes')
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * Handle http operation that failed, let the application continue
   * 
   * @param operation - name of operation that failed
   * @param result - optional value to return as the observable result
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send error to remote logging infrastructure
      console.error(error);

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed ${error.message}`);

      //let app keep running by returning empty result
      return of(result as T);
    }
  }

  getHero(id: number): Observable<Hero | undefined> {
    const hero = HEROES.find(hero => hero.id === id);
    this.messageService.addMessage(`HeroService: fetched hero id=${id}`)
    return of(hero);
  }

  private log(message: string){
    this.messageService.addMessage(`HeroService: ${message}`)
  }
}
