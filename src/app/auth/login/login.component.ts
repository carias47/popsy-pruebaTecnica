import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(LoginService);
  loading = false;

  // Definición del formulario reactivo
  // nonNullable evita valores nulos
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  //Envio data del formulario
  submitData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      //login exitoso
      next: () => {
        this.loading = false;
        Swal.fire({
          title: 'Bienvenido a popsy!',
          text: 'es un gusto verte de nuevo',
          icon: 'success',
        })
      },
      //Error
      error: () => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      }
    })

  }

}
