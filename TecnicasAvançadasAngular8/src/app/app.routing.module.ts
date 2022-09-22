import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesModule } from './games/games.module';
import { CadastroGameComponent } from './games/cadastro-games/cadastro-game.component';
import { ListagemGamesComponent } from './games/listagem-games/listagem-games.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'games',
      pathMatch: 'full'
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        component: ListagemGamesComponent
      },
      {
        path: 'cadastro',
        component: CadastroGameComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'games' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GamesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
