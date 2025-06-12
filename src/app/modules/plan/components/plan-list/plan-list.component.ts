import { Component, OnInit } from '@angular/core';
import { IPlan } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { PlanService } from '../../service/plan.service';
import { BaseComponentList } from '../../../../base/components/base-list';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss',
  standalone: false,
})
export class PlanListComponent
  extends BaseComponentList<IPlan>
  implements OnInit {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Planlar',
    label: "Planlar ro'yhati",
    url: '/user-plan',
  };

  constructor(private _baseSrv: PlanService) {
    super(_baseSrv);
  }
  columns = [
    { title: 'Nomi', key: 'name' },
    { title: 'Narxi', key: 'price' },
    { title: 'Premium kuni', key: 'premium_date' },
    { title: 'Status', key: 'is_active' },
  ];
  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
