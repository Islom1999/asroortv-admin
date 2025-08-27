import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';
import { BaseModule } from '../../shared/modules';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
  {
    path: 'add',
    component: BooksDetailComponent,
  },
  {
    path: 'update/:id',
    component: BooksDetailComponent,
  },
];

@NgModule({
  declarations: [BooksListComponent, BooksDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,

    CKEditorModule,
    NzUploadModule,
    NzModalModule,
    NzDrawerModule,
  ],
})
export class BooksModule {}
