import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UserModel } from 'src/app/auth/interface/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faEnvelope = faEnvelope;

  currentLogin!: UserModel;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.currentUser().subscribe((user) => {
      this.currentLogin = user[0];
    });
  }
}
