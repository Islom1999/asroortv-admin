import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IRole } from '../../../../../interfaces';
import { RoleAdminService } from '../../service/role-admin.service';
import { Breadcrumb } from '../../../../../types/breadcrump';

@Component({
  selector: 'app-role-admin-list',
  templateUrl: './role-admin-list.component.html',
  styleUrl: './role-admin-list.component.scss',
  standalone: false,
})
export class RoleAdminListComponent extends BaseComponentList<IRole> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'Rollar',
    label: "Rollar ro'yhati",
    url: '/role-admin',
  };

  columns = [
    { title: 'Nomi', key: 'name' },
    { title: 'Ruxsatnomalar', key: 'permissions' },
  ];

  constructor(private _baseSrv: RoleAdminService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
