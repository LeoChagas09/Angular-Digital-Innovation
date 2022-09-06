import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Error404Compoennt } from "src/app/error-404/error-404.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@NgModule({
  declarations: [
    NavBarComponent,
    Error404Compoennt
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '**', component: Error404Compoennt
      }
    ]),
  ],
  exports: [
    NavBarComponent,
  ]
})
export class CoreModule {

}
