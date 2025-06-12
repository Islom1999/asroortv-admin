import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminListComponent } from './components/user-admin-list/user-admin-list.component';
import { UserAdminDetailComponent } from './components/user-admin-detail/user-admin-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';

const routes: Routes = [
  {
    path: '',
    component: UserAdminListComponent
  },
  {
    path: 'add',
    component: UserAdminDetailComponent
  },
  {
    path: 'update/:id',
    component: UserAdminDetailComponent
  },
];


@NgModule({
  declarations: [
    UserAdminListComponent,
    UserAdminDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
  ]
})
export class UserAdminModule { }
