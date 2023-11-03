import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        const token = response.token; // Suponiendo que la API devuelve un token
        this.authService.setToken(token);
        // Redirige al usuario a la página de inicio o a la página deseada
      },
      error: (error) => {
        // Maneja los errores de inicio de sesión aquí
        console.error('Error de inicio de sesión:', error);
      },
    });
  }
}
