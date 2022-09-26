import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/core/games.service';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-listagem-games',
  templateUrl: './listagem-games.component.html',
  styleUrls: ['./listagem-games.component.scss']
})
export class ListagemGamesComponent implements OnInit {

  games: Game[] = [];

  constructor(
    private gamesService: GamesService,
  ) { }

  ngOnInit() {
    this.gamesService.listar().subscribe((games: Game[]) => this.games = games);
  }

}
