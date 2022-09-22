import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss']
})
export class CadastroProdutosComponent implements OnInit {

  cadastro: FormGroup;

  constructor(
    public validacao: ValidarCamposService,
    private fb: FormBuilder
    ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      nomeProduto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      teorAlcoolico: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      embalagens: [''],
      tipo: ['', [Validators.required]],
    });

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
