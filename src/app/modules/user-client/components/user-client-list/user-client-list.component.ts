import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IUser } from '../../../../../interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { UserClientService } from '../../service/user-client.service';
import { UserClientDetailComponent } from '../user-client-detail/user-client-detail.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { StatusType } from '../../../../../enumerations';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-client-list',
  templateUrl: './user-client-list.component.html',
  styleUrl: './user-client-list.component.scss',
  standalone: false
})
export class UserClientListComponent extends BaseComponentList<IUser> {
  id = '';
  name = '';
  email = '';
  phone = '';
  status_type = ''

  override breadcrumb: Breadcrumb = {
    header: "Userlar",
    label: "Userlar ro'yhati",
    url: '/user-user'
  };

  columns = [
    { title: 'Id', key: 'bigint_id' },
    { title: 'Ismi', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Tell', key: 'phone' },
    { title: 'Status', key: 'status_type' },
    { title: 'Premium tugash sanasi', key: 'premium_end_date' },
  ];

  constructor(
    private _baseSrv: UserClientService,

    private drawerService: NzDrawerService,
  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override edit(id: string): void {
    this.drawerService.create<UserClientDetailComponent, { id: string }, string>({
      nzTitle: 'User premium ma\'lumotlari',
      nzContent: UserClientDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }

  onSearchChange(value: string): void {
    this.onSearch({ id: this.id, name: this.name, email: this.email, phone: this.phone, status_type: this.status_type as StatusType });
  }
}
