import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFileListComponent } from './components/book-file-list/book-file-list.component';
import { BookFileDetailComponent } from './components/book-file-detail/book-file-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';
import { BaseModule } from '../../shared/modules';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { BookFileInfoComponent } from './components/book-file-info/book-file-info.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes: Routes = [
  {
    path: '',
    component: BookFileListComponent,
  },
  {
    path: 'add',
    component: BookFileDetailComponent,
  },
  {
    path: 'update/:id',
    component: BookFileDetailComponent,
  },
  {
    path: 'watch/:id',
    component: BookFileInfoComponent,
  },
];

@NgModule({
  declarations: [
    BookFileListComponent,
    BookFileDetailComponent,
    BookFileInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
    NzUploadModule,
    NzProgressModule,
    NgxDocViewerModule,
  ],
})
export class BookFileModule {}
