import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAdminListComponent } from './components/role-admin-list/role-admin-list.component';
import { RoleAdminDetailComponent } from './components/role-admin-detail/role-admin-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';

const routes: Routes = [
  {
    path: '',
    component: RoleAdminListComponent,
  },
  {
    path: 'add',
    component: RoleAdminDetailComponent,
  },
  {
    path: 'update/:id',
    component: RoleAdminDetailComponent,
  },
];

@NgModule({
  declarations: [RoleAdminListComponent, RoleAdminDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
  ],
})
export class RoleAdminModule {}
