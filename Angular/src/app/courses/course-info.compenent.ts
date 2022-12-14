import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit{

  course!: Course | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
    ){}

  ngOnInit(): void {
  this.courseService.retrieveById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe({
    next: course => this.course = course,
    error: erro => console.log('Error', erro)
  });

  }

  save(): void {
    this.courseService.save(this.course).subscribe({
      next: course => console.log('Saved with success', course),
      error: erro => console.log('Error', erro)
    });
  }
}
