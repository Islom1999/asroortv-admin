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
  standalone: false
})
export class PromoListComponent extends BaseComponentList<IPromo> {
  promos$: Observable<IPromo[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Promolar",
    label: "Promolar ro'yhati",
    url: '/user-promo'
  };

  constructor(
    private _baseSrv: PromoService,

  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.promos$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.promos$ = this.promos$.pipe(
      switchMap((item) =>
        of(
          item.filter((promo) =>
            promo.code
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
