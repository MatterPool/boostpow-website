import { NgModule } from '@angular/core';
import { ComponentCollectionModule } from '@app/components';
import { BrowserModule } from '@angular/platform-browser';

import { StatusContainerComponent } from './status_container/status_container.component';
import { UploadContainerComponent } from './upload_container/upload_container.component';
import { PreviewContainerComponent } from './preview_container/preview_container.component';
import { HomeContainerComponent } from './home_container/home_container.component';
import { CreateContainerComponent } from './create_container/create_container.component';
import { JobContainerComponent } from './job_container/job_container.component';
import { MiningContainerComponent } from './mining_container/mining_container.component';
import { SearchContainerComponent } from './search_container/search_container.component';
import { ContentContainerComponent } from './content_container/content_container.component';
export const PAGES = [
  UploadContainerComponent,
  StatusContainerComponent,
  PreviewContainerComponent,
  HomeContainerComponent,
  CreateContainerComponent,
  JobContainerComponent,
  MiningContainerComponent,
  SearchContainerComponent,
  ContentContainerComponent
];

@NgModule({
  imports: [BrowserModule, ComponentCollectionModule],
  declarations: PAGES,
  exports: PAGES
})
export class PagesCollectionModule {}
