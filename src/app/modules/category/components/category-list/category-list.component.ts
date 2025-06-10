import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { ICategory } from '../../../../../interfaces/category';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  standalone: false,
})
export class CategoryListComponent extends BaseComponentList<ICategory> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Categorylar',
    label: "Categorylar ro'yhati",
    url: '/user-category',
  };

  columns = [{ title: 'Nomi', key: 'name' }];

  constructor(private _baseSrv: CategoryService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
