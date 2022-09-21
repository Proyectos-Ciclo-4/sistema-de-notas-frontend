import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor(private authService:AuthService) {}

  succesMessage(message = 'Your work has been saved') {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  errorMessage(message = 'Something went wrong!') {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: 'Why do I have this issue?',
    });
  }

  resetPassword(){
    Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        debugger
        return this.authService.resetPassword(email)
          .then(response => {
           console.log(response)
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.succesMessage("Se envió la contraseña satisfactoriamente ")
      }
    })
  }
}
