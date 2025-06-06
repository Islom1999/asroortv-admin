import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IRole } from '../../../../../interfaces';
import { RoleAdminService } from '../../service/role-admin.service';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-role-admin-list',
  templateUrl: './role-admin-list.component.html',
  styleUrl: './role-admin-list.component.scss',
  standalone: false,
})
export class RoleAdminListComponent extends BaseComponentList<IRole> {
  roles$: Observable<IRole[]> = of([]);

  // Serch variables
  searchValue = '';
  visible = false;

  override breadcrumb: Breadcrumb = {
    header: 'Rollar',
    label: "Rollar ro'yhati",
    url: '/role-admin',
  };

  constructor(private _baseSrv: RoleAdminService) {
    super(_baseSrv);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.roles$ = this.data$;
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  columns = [{ title: 'Nomi', key: 'name' }];
  // Search function
  search(): void {
    this.visible = false;
    this.roles$ = this.roles$.pipe(
      switchMap((item) =>
        of(
          item.filter((role) =>
            role.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }
}
