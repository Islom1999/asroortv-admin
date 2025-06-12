import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IOrder } from '../../../../../interfaces/order';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { OrderService } from '../../service/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { PaymentProvider } from '../../../../../enumerations';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  standalone: false
})
export class OrderListComponent extends BaseComponentList<IOrder> {
  tid = '';
  user_name = '';
  transaction_provider = '';

  override breadcrumb: Breadcrumb = {
    header: "Orderlar",
    label: "Orderlar ro'yhati",
    url: '/order-order'
  };

  columns = [
    { title: 'TID', key: 'tid' },
    { title: 'Ismi', key: 'user.name' },
    { title: 'Turi', key: 'transactions[0].provider' },
    { title: 'To\'langan sana', key: 'updated_at' },
    { title: 'Narx', key: 'price' },
    { title: 'Tarif', key: 'plan.name' },
  ];

  constructor(
    private _baseSrv: OrderService,

    private drawerService: NzDrawerService,
  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override edit(id: string): void {
    this.drawerService.create<OrderDetailComponent, { id: string }, string>({
      nzTitle: 'Order premium ma\'lumotlari',
      nzContent: OrderDetailComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
      }
    });
  }

  onSearchChange(value: string): void {
    this.onSearch({ tid: this.tid });
  }
}
