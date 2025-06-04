import { Component, inject, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from './shared/services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'anime-admin';

  permissionsService = inject(PermissionService)
  ngxPermissionsService = inject(NgxPermissionsService)

  ngOnInit(): void {
    this.permissionsService.getPermisssion().subscribe(permission => {
      this.ngxPermissionsService.loadPermissions(permission);
    })
  }
}
