import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

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
    private fb: FormBuilder
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

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid) {
      return;
    }

    alert('SUCESSO!!\n\n' + JSON.stringify(this.cadastro.value, null, 4))
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

}
