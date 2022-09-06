import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.compenent';
import { CourseListComponent } from './course-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StarModule } from 'src/shared/component/star/star.module';
import { AppPipeModule } from 'src/shared/pipe/app-pipe.module';



@NgModule({
  declarations: [
    CourseInfoComponent,
    CourseListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    StarModule,
    AppPipeModule,
    RouterModule.forRoot([
     {
        path: 'courses', component: CourseListComponent
      },
      {
        path: 'courses/info/:id', component: CourseInfoComponent
      }
    ])
  ]
})
export class CourseModule { }
