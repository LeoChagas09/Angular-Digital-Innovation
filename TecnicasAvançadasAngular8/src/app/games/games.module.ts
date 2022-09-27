import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { CadastroGameComponent } from './cadastro-games/cadastro-game.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemGamesComponent } from './listagem-games/listagem-games.component';
import { CamposModule } from '../shared/components/campos/campos.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroGameComponent, ListagemGamesComponent]
})
export class GamesModule { }
