import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { ISounder } from '../../../../../interfaces/sounder';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { SounderService } from '../../service/sounder.service';

@Component({
  selector: 'app-sounder-list',
  templateUrl: './sounder-list.component.html',
  styleUrl: './sounder-list.component.scss',
  standalone: false,
})
export class SounderListComponent extends BaseComponentList<ISounder> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Sounderlar',
    label: "Sounderlar ro'yhati",
    url: '/user-sounder',
  };

  constructor(private _baseSrv: SounderService) {
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
