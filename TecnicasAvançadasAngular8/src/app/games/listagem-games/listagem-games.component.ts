import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators'
import { GamesService } from 'src/app/core/games.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-listagem-games',
  templateUrl: './listagem-games.component.html',
  styleUrls: ['./listagem-games.component.scss']
})
export class ListagemGamesComponent implements OnInit {

  readonly semfoto = 'https://centralcabos.vteximg.com.br/arquivos/ids/159950-400-400/produto_sem_foto.gif?v=635922653155000000';

  config: ConfigParams = {
    pagina: 0,
    limite: 0,
  }
  games: Game[] = [];
  filtrosListagem: FormGroup;

  generos: Array<string>;

  constructor(
    private gamesService: GamesService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: [''],
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
        this.config.campo = {tipo: 'genero', valor: val};
        this.resetarConsulta();
    });

    this.generos = ['Ação', 'Aventura', 'RPG', 'Esportes', 'FPS', 'Terror'];

    this.listarGames();
  }

  onScroll(): void {
    this.listarGames();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/games/' + id);
  }

  private listarGames(): void {
    this.config.pagina++;
    this.gamesService.listar(this.config)
    .subscribe((games: Game[]) => this.games.push(...games));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.games = [];
    this.listarGames();
  }

}
