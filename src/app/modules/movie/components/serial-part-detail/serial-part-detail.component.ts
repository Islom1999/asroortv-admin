import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { catchError, of } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-serial-part-detail',
  templateUrl: './serial-part-detail.component.html',
  styleUrl: './serial-part-detail.component.scss'
})
export class SerialPartDetailComponent implements OnInit {
  @Input()
  id!:string
  @Input()
  parent_id!:string
  
  loading = true;
  disableBtn = true;

  form: FormGroup = new FormGroup({});

  constructor(
    private _modelSrv: MovieService,
    private nzMessageService: NzMessageService,
    protected breadcrumbService: BreadcrumbsService,
    private drawerRef: NzDrawerRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      video: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
    if (this.id) {
      this._modelSrv.getByIdPart(this.id).subscribe((movie) => {
        this.form.patchValue(movie);
        this.disableBtn = false;
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.disableBtn = false;
    }
  }

  submit() {
    if (this.form.valid) {
      this.disableBtn = true;
      if (this.id) {
        this.update(this.id);
      } else {
        this.create();
      }
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  create() {
    this._modelSrv
      .createPart({...this.form.value, movie_id: this.parent_id})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Create data');
    });
    this.drawerRef.close()
  }

  update(id: string) {
    this._modelSrv
      .updatePart(id, {...this.form.value, movie_id: this.parent_id})
      .pipe(
        catchError(({ error }) => {
          if (error?.statusCode == 409)
            this.nzMessageService.error(error?.message);
          this.disableBtn = false;
          return of();
        })
      )
      .subscribe(() => {
        this.nzMessageService.success('Update data');
    });
    this.drawerRef.close()
  }

  close() {
    this.drawerRef.close()
  }
}
