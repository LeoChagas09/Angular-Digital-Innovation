import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/core/games.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-cadastro-games',
  templateUrl: './cadastro-game.component.html',
  styleUrls: ['./cadastro-game.component.scss']
})
export class CadastroGameComponent implements OnInit {

  cadastro: UntypedFormGroup;
  generos: Array<string>;
  id: number

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private gamesService: GamesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.gamesService.visualizar(this.id).subscribe((game: Game) => this.criarFormulario(game));
    } else {
      this.criarFormulario(this.criarGameEmBranco());
    }

    this.generos = ['Ação', 'Aventura', 'RPG', 'Esportes', 'FPS', 'Terror']

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid) {
      return;
    }
    const game = this.cadastro.getRawValue() as Game;
    if(this.id) {
      game.id = this.id;
      this.editar(game)
    } else {
      this.salvar(game);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(game: Game): void {
    this.cadastro = this.fb.group({
      nome: [game.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [game.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [game.dtLancamento, [Validators.required]],
      descricao: [game.descricao],
      preco: [game.preco, [Validators.required, Validators.min(0), Validators.max(100)]],
      plataforma: [game.plataforma],
      genero: [game.genero, [Validators.required]],
    });
  }

  private criarGameEmBranco(): Game {
    return {
      id: null,
      nome: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      preco: null,
      plataforma: null,
      genero: null
    } as Game
  }

  private salvar(game: Game): void {
    this.gamesService.salvar(game).subscribe(()=> {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo jogo',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao) {
          this.router.navigateByUrl('games');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(game: Game): void {
    this.gamesService.editar(game).subscribe(()=> {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('games'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
