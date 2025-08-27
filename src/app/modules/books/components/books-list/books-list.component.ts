import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBook } from '../../../../../interfaces/books';
import { HttpClient } from '@angular/common/http';
import { BaseComponentList } from '../../../../base/components/base-list';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BooksService } from '../../service/books.service';
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
    { title: 'Turi', key: 'status_type' },
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
