import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../courses';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent  implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

  share() {
    window.alert('The product has been shared!');
  }

  onRegister() {
    window.alert('You will be notified when the product goes on sale');
  }
}
