import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(
    private authSrv: AuthService,
  ) { }

  ngOnInit(): void { }

  logout() {
    return this.authSrv.logout()
  }
}
