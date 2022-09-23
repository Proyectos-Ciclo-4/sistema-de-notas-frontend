import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor(private authService: AuthService) {}

  succesMessage(message = 'La operación se efectúo con éxito') {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  errorMessage(message = 'Algo salio mal!') {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: 'Verifica la información ingresada',
    });
  }

  resetPassword() {
    Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.authService
          .resetPassword(email)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            Swal.showValidationMessage(`Operación fallida: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Se envió la contraseña satisfactoriamente al correo registrado'
        );
      }
    });
  }

  confirmationPopup(title: string, text: string, messageButton: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: messageButton,
    });
  }

  confirmationPopup(title:string, text: string, messageButton: string){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: messageButton
    })
  }


}
