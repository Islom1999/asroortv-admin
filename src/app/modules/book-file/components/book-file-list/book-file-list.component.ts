import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IFile } from '../../../../../interfaces/books';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { IColumn } from '../../../../base/components/base-table/base-table.component';
import { BookFileService } from '../../service/book-file.service';

@Component({
  selector: 'app-book-file-list',
  standalone: false,
  templateUrl: './book-file-list.component.html',
  styleUrl: './book-file-list.component.scss',
})
export class BookFileListComponent extends BaseComponentList<IFile> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Kitoblar fayllari',
    label: "Kitoblar fayllari ro'yhati",
    url: '/book-file',
  };

  columns: IColumn[] = [
    { title: 'Nomi', key: 'file_name' },
    { title: 'Hajmi', key: 'file_size' },
    { title: 'Turi', key: 'used' },
    { title: "Qo'shilgan", key: 'created_at', type: 'date' },
    { title: 'Yangilangan', key: 'updated_at', type: 'date' },
  ];

  constructor(private _baseSrv: BookFileService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ file_name: value });
  }

  override edit(id: string): void {
    if (id) {
      this.router.navigate(['watch', id], { relativeTo: this.route });
    }
  }
}
