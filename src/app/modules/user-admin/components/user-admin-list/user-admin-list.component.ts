import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAdmin } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { UserAdminService } from '../../service/user-admin.service';
import { BaseComponentList } from '../../../../base/components/base-list';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrl: './user-admin-list.component.scss',
  standalone: false
})
export class UserAdminListComponent extends BaseComponentList<IAdmin> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: "Adminlar",
    label: "Adminlar ro'yhati",
    url: '/user-admin'
  };

  columns = [
    { title: 'Ismi', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Status', key: 'is_block' },
  ];

  constructor(
    private _baseSrv: UserAdminService,

  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
