import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GamesService } from 'src/app/core/games.service';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Game } from 'src/app/shared/models/game';

@Component({
  selector: 'dio-cadastro-games',
  templateUrl: './cadastro-game.component.html',
  styleUrls: ['./cadastro-game.component.scss']
})
export class CadastroGameComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    private fb: FormBuilder,
    private gamesService: GamesService,
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
      alert('Sucesso');
    },
    () => {
      alert('Erro ao salvar');
    });
  }

}
