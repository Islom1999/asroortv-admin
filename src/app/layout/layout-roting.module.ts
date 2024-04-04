import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'role-admin',
                loadChildren: () => import('../modules').then((m) => m.RoleAdminModule)
            },
            {
                path: 'user-admin',
                loadChildren: () => import('../modules').then((m) => m.UserAdminModule)
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
