import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BooksService } from '../../service/books.service';
import { IBook } from '../../../../../interfaces/books';
import { IColumn } from '../../../../base/components/base-table/base-table.component';

@Component({
  selector: 'app-books-list',
  standalone: false,
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent extends BaseComponentList<IBook> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Kitoblar',
    label: "Kitoblar ro'yhati",
    url: '/book',
  };

  columns: IColumn[] = [
    { title: 'Nomi', key: 'name' },
    { title: 'Status', key: 'status_type' },
    { title: "Ko'rinish", key: 'book_type' },
    { title: 'Narxi', key: 'price' },
    { title: "Qo'shilgan", key: 'created_at', type: 'date' },
    { title: 'Yangilangan', key: 'updated_at', type: 'date' },
  ];

  constructor(private _baseSrv: BooksService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
