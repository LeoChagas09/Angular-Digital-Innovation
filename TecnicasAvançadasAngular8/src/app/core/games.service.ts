import { HttpClient, HttpParams } from '@angular/common/http';
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

  listar(pagina: number, qtdPagina: number): Observable<Game[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', pagina.toString());
    httpParams = httpParams.set('_limit', qtdPagina.toString());
    return this.http.get<Game[]>(url, { params: httpParams });
  }
}
