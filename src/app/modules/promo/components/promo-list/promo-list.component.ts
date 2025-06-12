import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IPromo } from '../../../../../interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PromoService } from '../../service/promo.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrl: './promo-list.component.scss',
  standalone: false,
})
export class PromoListComponent extends BaseComponentList<IPromo> {
  // Serch variables
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Promolar',
    label: "Promolar ro'yhati",
    url: '/user-promo',
  };

  columns = [
    { title: 'Promo', key: 'code' },
    { title: 'Chegirma', key: 'discount' },
    { title: 'Tarif', key: 'plan.name' },
    { title: 'Tarif', key: 'admin.name' },
    { title: 'Status', key: 'is_active' },
    { title: 'Soni', key: 'count' },
  ];

  constructor(private _baseSrv: PromoService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ code: value });
  }
}
