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
      customClass:{
        popup:"card-custom"
      }
    });
  }

  errorMessage(
    message = 'Algo salio mal!',
    footer: string = 'Verifica la información ingresada'
  ) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: footer,
      cancelButtonColor: '#fa3007',
      confirmButtonColor: '#673ab7',
      customClass:{
        popup:"card-custom"
      }
    });
  }

  resetPassword() {
    Swal.fire({
      title: 'Coloca un correo para recuperar tu contraseña',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonColor: '#fa3007',
      confirmButtonColor: '#673ab7',
      showLoaderOnConfirm: true,
      customClass:{
        popup:"card-custom"
      },
      preConfirm: (email) => {
        return this.authService
          .resetPassword(email)
          .then(() => {
            console.log("correo enviado");
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
      cancelButtonColor: '#fa3007',
      confirmButtonColor: '#673ab7',
      confirmButtonText: messageButton,
      cancelButtonText:'Cancelar',
      customClass:{
        popup:"card-custom"
      }
    });
  }
}
