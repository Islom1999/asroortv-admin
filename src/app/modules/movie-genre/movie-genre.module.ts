import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieGenreListComponent } from './components/movie-genre-list/movie-genre-list.component';
import { MovieGenreDetailComponent } from './components/movie-genre-detail/movie-genre-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../../shared/modules';
import { BaseTableComponent } from '../../base/components/base-table/base-table.component';

const routes: Routes = [
  {
    path: '',
    component: MovieGenreListComponent,
  },
  {
    path: 'add',
    component: MovieGenreDetailComponent,
  },
  {
    path: 'update/:id',
    component: MovieGenreDetailComponent,
  },
];

@NgModule({
  declarations: [MovieGenreListComponent, MovieGenreDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BaseModule,
    BaseTableComponent,
  ],
})
export class MovieGenreModule {}
