import { BaseTableComponent } from './../../base/components/base-table/base-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoListComponent } from './components/promo-list/promo-list.component';
import { PromoDetailComponent } from './components/promo-detail/promo-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';

const routes: Routes = [
  {
    path: '',
    component: PromoListComponent,
  },
  {
    path: 'add',
    component: PromoDetailComponent,
  },
  {
    path: 'update/:id',
    component: PromoDetailComponent,
  },
];

@NgModule({
  declarations: [PromoListComponent, PromoDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
  ],
})
export class PromoModule {}
