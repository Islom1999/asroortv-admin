import { Component } from '@angular/core';
import { IVideo } from '../../../../../interfaces';
import { Breadcrumb } from '../../../../../types/breadcrump';
import { BaseComponentList } from '../../../../base/components/base-list';
import { VideosService } from '../../service/videos.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrl: './videos-list.component.scss',
  standalone: false
})
export class VideosListComponent extends BaseComponentList<IVideo> {
  searchValue = '';

  override breadcrumb: Breadcrumb = {
    header: "Videolar",
    label: "Videolar ro'yhati",
    url: '/'
  };

  columns = [
    { title: 'Fayl nomi', key: 'file_name' },
    { title: 'Default format', key: 'default_format' },
    { title: 'Fayl hajmi', key: 'file_size' },
    { title: 'Formatlar', key: 'format' },
    { title: 'Yuklangan sana', key: 'created_at' },
  ];

  constructor(
    private _baseSrv: VideosService,

  ) {
    super(_baseSrv)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override edit(id: string): void {
    if (id) {
      this.router.navigate(['info', id], { relativeTo: this.route });
    }
  }

  onSearchChange(value: string): void {
    this.onSearch({ file_name: value });
  }
}
