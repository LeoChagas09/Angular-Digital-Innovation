import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/core/games.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-visualizar-games',
  templateUrl: './visualizar-games.component.html',
  styleUrls: ['./visualizar-games.component.scss']
})
export class VisualizarGamesComponent implements OnInit {

  readonly semfoto = 'https://centralcabos.vteximg.com.br/arquivos/ids/159950-400-400/produto_sem_foto.gif?v=635922653155000000';

  game: Game;
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private visualizar(): void {
    this.gamesService.visualizar(this.id).subscribe((game: Game) => this.game = game);
  }

  editar(): void {
    this.router.navigateByUrl('/games/cadastro/' + this.id);
  }

  excluir(): void {
   const config = {
        data: {
          titulo: 'Você tem certeza que deseja excluir?',
          descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
          corBtnCancelar: 'primary',
          corBtnSucesso: 'warn',
          possuirBtnFechar: true
        } as Alerta
      };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.gamesService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/games'));
      }
    });
  }

}
