import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IYear } from '../../../../../interfaces/year';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { YearService } from '../../service/year.service';

@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
  styleUrl: './year-list.component.scss',
  standalone: false
})
export class YearListComponent extends BaseComponentList<IYear> {
  yearFilter!: number

  override breadcrumb: Breadcrumb = {
    header: "Yearlar",
    label: "Yearlar ro'yhati",
    url: '/user-year'
  };

  constructor(
    private _baseSrv: YearService,
  ) {
    super(_baseSrv)
  }

  columns = [
    { title: 'Nomi', key: 'year' },
  ];

  override ngOnInit(): void {
    super.ngOnInit();
  }


  onSearchChange(value: number): void {
    this.onSearch({ year: value });
  }
}
