import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Game } from '../shared/models/game';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/games/'
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService
  ) { }

  salvar(game: Game): Observable<Game>{
    return this.http.post<Game>(url, game);
  }

  editar(game: Game): Observable<Game> {
    return this.http.put<Game>(url + game.id, game);
  }

  listar(config: ConfigParams): Observable<Game[]>{
    const configParams = this.configService.configurarParametros(config);
    return this.http.get<Game[]>(url, { params: configParams });
  }

  visualizar(id: number): Observable<Game> {
    return this.http.get<Game>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
