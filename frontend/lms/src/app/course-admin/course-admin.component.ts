import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIurlCourses } from 'src/assets/config.service';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.css'],
})
export class CourseAdminComponent  implements OnInit{
  courseName!: string;
  courseDescription!: string;
  tokenExists: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Verifica la existencia del token de autenticación
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, redirige al usuario a la página de inicio de sesión
      // Puedes usar el enrutamiento para hacer esto
      // this.router.navigate(['/login']);
      alert('Debes iniciar sesión para acceder a esta página.');
    } else {
      this.tokenExists = true;
    }
  }

  submitForm() {
    const formData = {
      courseName: this.courseName,
      courseDescription: this.courseDescription,
    };

    this.http.post(APIurlCourses, formData).subscribe({
      next: (response: any) => {
        console.log('Respuesta de la API:', response);
      },
      error: (error) => {
        console.error('Error de API:', error);
      },
    });
  }
}
