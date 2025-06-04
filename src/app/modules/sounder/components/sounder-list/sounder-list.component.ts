import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { ISounder } from '../../../../../interfaces/sounder';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { SounderService } from '../../service/sounder.service';

@Component({
  selector: 'app-sounder-list',
  templateUrl: './sounder-list.component.html',
  styleUrl: './sounder-list.component.scss',
  standalone: false
})
export class SounderListComponent extends BaseComponentList<ISounder> {
  sounders$: Observable<ISounder[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: "Sounderlar",
    label: "Sounderlar ro'yhati",
    url: '/user-sounder'
  };

  constructor(
    private _baseSrv: SounderService,

  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.sounders$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.sounders$ = this.sounders$.pipe(
      switchMap((item) =>
        of(
          item.filter((sounder) =>
            sounder.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
