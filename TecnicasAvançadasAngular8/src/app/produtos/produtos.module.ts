import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemProdutosComponent } from './listagem-produtos/listagem-produtos.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CadastroProdutosComponent, ListagemProdutosComponent]
})
export class ProdutosModule { }
