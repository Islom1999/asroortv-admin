import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearDetailComponent } from './components/year-detail/year-detail.component';
import { YearListComponent } from './components/year-list/year-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';

const routes: Routes = [
  {
    path: '',
    component: YearListComponent,
  },
  {
    path: 'add',
    component: YearDetailComponent,
  },
  {
    path: 'update/:id',
    component: YearDetailComponent,
  },
];

@NgModule({
  declarations: [YearDetailComponent, YearListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
  ],
})
export class YearModule {}
