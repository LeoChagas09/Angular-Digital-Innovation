import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/core/games.service';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-listagem-games',
  templateUrl: './listagem-games.component.html',
  styleUrls: ['./listagem-games.component.scss']
})
export class ListagemGamesComponent implements OnInit {

  readonly qtdPagina = 4;
  pagina = 0;
  games: Game[] = [];

  constructor(
    private gamesService: GamesService,
  ) { }

  ngOnInit() {
    this.listarGames();
  }

  onScroll(): void {
    this.listarGames();
  }

  private listarGames(): void {
    this.pagina++;
    this.gamesService.listar(this.pagina, this.qtdPagina)
    .subscribe((games: Game[]) => this.games.push(...games));
  }

}
