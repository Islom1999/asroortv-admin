import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IOrder } from '../../../../../interfaces/order';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { OrderService } from '../../service/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent extends BaseComponentList<IOrder> {
  orders$: Observable<IOrder[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Orderlar", 
    label: "Orderlar ro'yhati", 
    url: '/order-order'
  };

  constructor(
    private _baseSrv: OrderService,
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
    this.orders$ = this.data$;
  }
  
  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.orders$ = this.orders$.pipe(
      switchMap((item) =>
        of(
          item.filter((order) =>
            order.tid
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  open(id:string): void {
    this.drawerService.create<OrderDetailComponent, { id: string }, string>({
      nzTitle: 'Order premium ma\'lumotlari',
      nzContent: OrderDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }
}
