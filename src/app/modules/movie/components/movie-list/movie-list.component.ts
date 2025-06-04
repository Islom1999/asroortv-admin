import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IMovie } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { MovieService } from '../../service/movie.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { MovieType } from '../../../../../enumerations';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  standalone: false
})
export class MovieListComponent implements OnInit {
  movies$: Observable<IMovie[]> = this._baseSrv._data.pipe()
  movie_type_serial = MovieType.serial

  // Serch variables
  searchValue = '';
  visible = false;

  breadcrumb: Breadcrumb = {
    header: "Movielar",
    label: "Movielar ro'yhati",
    url: '/user-country'
  };

  constructor(
    private _baseSrv: MovieService,
    private _nzMessageService: NzMessageService,
    private _breadcrumbService: BreadcrumbsService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit(): void {
    this._breadcrumbService.setBreadcrumbs([
      {
        header: this.breadcrumb.header,
        label: this.breadcrumb.label,
        url: this.breadcrumb.url
      },
    ]);
  }

  // Search reset function
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  // Search function
  search(): void {
    this.visible = false;
    this.movies$ = this.movies$.pipe(
      switchMap((item) =>
        of(
          item.filter((country) =>
            country.name
              .toLocaleLowerCase()
              .includes(this.searchValue.toLocaleLowerCase())
          )
        )
      )
    );
  }

  delete(id: string | undefined): void {
    if (!id) return
    this._baseSrv.delete(id).subscribe((data) => {
      this._nzMessageService.error('delete')
    })
  }

  // info
  open(id: string, movie_type: MovieType): void {
    this.drawerService.create<MovieInfoComponent, { id: string, movie_type: MovieType }, string>({
      nzTitle: 'Movie ma\'lumotlari',
      nzContent: MovieInfoComponent,
      nzSize: 'large',
      nzContentParams: {
        id: id,
        movie_type
      }
    });
  }
}
