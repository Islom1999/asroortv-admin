

import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Observable, } from 'rxjs';
import { BaseApiService } from '../services/base-api.service';
import { Breadcrumb } from '../../../types/breadcrump';
import { BreadcrumbsService } from '../../shared/services/breadcrumbs.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: '',
  standalone: false
})
export abstract class BaseComponentList<T> implements OnInit {
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public nzMessageService = inject(NzMessageService);
  public breadcrumbService = inject(BreadcrumbsService)

  data = signal<T[]>([]);
  loading = false
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  filter: Partial<T> = {};

  abstract breadcrumb: Breadcrumb

  constructor(
    protected baseSrv: BaseApiService<T>,
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      {
        header: this.breadcrumb.header,
        label: this.breadcrumb.label,
        url: this.breadcrumb.url
      },
    ]);
  }

  loadData(params: { pageIndex: number; pageSize: number }) {
    this.loading = true;
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;

    let queryParams = new HttpParams()
      .set('page', this.pageIndex.toString())
      .set('limit', this.pageSize.toString());

    Object.entries(this.filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams = queryParams.append(key, value as string);
      }
    });

    this.baseSrv.getAllPanination(queryParams).subscribe(res => {
      this.data.set(res.data)
      this.total = res.count;
      this.loading = false;
    });
  }

  onSearch(filterObject: Partial<T>) {
    this.filter = {
      ...this.filter,
      ...filterObject, // yangi qiymatlar bilan yangilanadi
    };

    this.loadData({ pageIndex: 1, pageSize: this.pageSize });
  }


  edit(id: string): void {
    if (id) {
      this.router.navigate(['update', id], { relativeTo: this.route });
    }
  }

  delete(id: string | undefined): void {
    if (!id) return
    this.baseSrv.delete(id).subscribe((data) => {
      this.nzMessageService.error('delete')
    })
  }
}
