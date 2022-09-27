import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private gamesService: GamesService,
    private router: Router
    ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      plataforma: [''],
      genero: ['', [Validators.required]],
    });

    this.generos = ['Ação', 'Aventura', 'RPG', 'Esportes', 'FPS', 'Terror']

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid) {
      return;
    }
    const game = this.cadastro.getRawValue() as Game;
    this.salvar(game);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(game: Game): void {
    this.gamesService.salvar(game).subscribe(()=> {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo jogo',
          corBtnCancelar: 'primary',
          possuiBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if(opcao) {
          this.router.navigateByUrl('games');
        } else {
          this.reiniciarForm();
        }
      })
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

}
