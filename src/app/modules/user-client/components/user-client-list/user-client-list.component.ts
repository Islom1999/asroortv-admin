import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IUser } from '../../../../../interfaces';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { UserClientService } from '../../service/user-client.service';
import { UserClientDetailComponent } from '../user-client-detail/user-client-detail.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-user-client-list',
  templateUrl: './user-client-list.component.html',
  styleUrl: './user-client-list.component.scss'
})
export class UserClientListComponent extends BaseComponentList<IUser> {
  users$: Observable<IUser[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Userlar", 
    label: "Userlar ro'yhati", 
    url: '/user-user'
  };

  constructor(
    private _baseSrv: UserClientService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private _permission: PermissionService,
    private _permissionSrv: NgxPermissionsService,  
    private drawerService: NzDrawerService,
  ){
    super(_baseSrv, _nzMessageService, _breadcrumbService, _permission, _permissionSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.users$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.users$ = this.users$.pipe(
      switchMap((item) =>
        of(
          item.filter((user) =>
            user.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<UserClientDetailComponent, { id: string }, string>({
      nzTitle: 'User premium ma\'lumotlari',
      nzContent: UserClientDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }
}
