import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //meotod login con simulacion de credenciales
  login(email: string, password: string): Observable<boolean> {

    if (email === 'popsy@test.com' && password === 'popsy123') {
      return of(true).pipe(delay(1500));
    }

    return throwError(() => new Error(`Credenciales inválidas`)).pipe(
      delay(2000),
    );
  }
}
