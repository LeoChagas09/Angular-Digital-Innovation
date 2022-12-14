import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  filteredCourses: Course[] = []

  _courses: Course[] = [];

  _filterBy: string = '';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.retriveAll();
  }

  retriveAll(): void {
    this.courseService.retrieveAll().subscribe({
      next: courses => {
        this._courses = courses;
        this.filteredCourses = this._courses
      },
      error: erro => console.log('Error', erro)
    });

  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success');
        this.retriveAll();
      },
      error: erro => console.log('Error', erro)
    })
  }

  set filter(value: string) {
      this._filterBy = value;

      this.filteredCourses = this._courses.filter((course : Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
  }

  get filter() {
    return this._filterBy;
  }

}
