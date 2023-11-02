import { Component,  OnInit } from '@angular/core';
import { Course } from '../courses';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {

  course: Course | undefined;
  courses: Course[] = [];

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const courseIdFromRoute = Number(routeParams.get('courseId'));

    this.courseService.getCourses().subscribe(courses => this.courses = courses);
    this.course = this.courses.find((course:Course) => course.id === courseIdFromRoute);
  }
}

