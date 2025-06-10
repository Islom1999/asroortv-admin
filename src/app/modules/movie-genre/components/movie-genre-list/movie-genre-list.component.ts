import { Component } from '@angular/core';
import { BaseComponentList } from '../../../../base/components/base-list';
import { IMovieGenre } from '../../../../../interfaces/movie_genre';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, switchMap } from 'rxjs';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BreadcrumbsService } from '../../../../shared/services/breadcrumbs.service';
import { MovieGenreService } from '../../service/movie-genre.service';

@Component({
  selector: 'app-movie-genre-list',
  templateUrl: './movie-genre-list.component.html',
  styleUrl: './movie-genre-list.component.scss',
  standalone: false,
})
export class MovieGenreListComponent extends BaseComponentList<IMovieGenre> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: 'MovieGenrelar',
    label: "MovieGenrelar ro'yhati",
    url: '/user-movie_genre',
  };

  constructor(private _baseSrv: MovieGenreService) {
    super(_baseSrv);
  }
  columns = [{ title: 'Nomi', key: 'name' }];
  override ngOnInit(): void {
    super.ngOnInit();
  }

  onSearchChange(value: string): void {
    this.onSearch({ name: value });
  }
}
