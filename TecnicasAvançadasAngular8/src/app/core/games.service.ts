import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../shared/models/game';

const url = 'http://localhost:3000/games/'
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient
  ) { }

  salvar(game: Game): Observable<Game>{
    return this.http.post<Game>(url, game);
  }

  listar(): Observable<Game[]>{
    return this.http.get<Game[]>(url);
  }
}
