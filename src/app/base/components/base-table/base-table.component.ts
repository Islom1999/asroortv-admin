import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-base-table',
  imports: [
    NzTableModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzSelectModule,
    NzPopconfirmModule
  ],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent {
  @Input() columns: { title: string, key: string }[] = [];
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() queryParamsChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() total: number = 0; // jami elementlar soni
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.queryParamsChange.emit({ pageIndex, pageSize });
  }
}
