import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faEnvelope = faEnvelope;

  currentUser!: User | null;

  constructor(private authservice: AuthService) {
    this.currentUser = this.authservice.currentUser();
  }

  ngOnInit(): void {}
}
