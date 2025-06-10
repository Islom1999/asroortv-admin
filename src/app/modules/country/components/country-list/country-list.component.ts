import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { ICountry } from '../../../../../interfaces/country';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { CountryService } from '../../service/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  standalone: false,
})
export class CountryListComponent extends BaseComponentList<ICountry> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Countrylar',
    label: "Countrylar ro'yhati",
    url: '/user-country',
  };

  constructor(private _baseSrv: CountryService) {
    super(_baseSrv);
  }
  columns = [{ title: 'Nomi', key: 'name' }];
  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
