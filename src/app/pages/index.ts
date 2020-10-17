import { NgModule } from '@angular/core';
import { ComponentCollectionModule } from '@app/components';
import { BrowserModule } from '@angular/platform-browser';

import { HomeContainerComponent } from './home_container/home_container.component';
import { JobsContainerComponent } from './jobs_container/jobs_container.component';
import { MiningContainerComponent } from './mining_container/mining_container.component';
import { SearchContainerComponent } from './search_container/search_container.component';
import { ContentContainerComponent } from './content_container/content_container.component';
import { GeneratorContainerComponent } from './generator_container/generator_container.component';
export const PAGES = [
  HomeContainerComponent,
  JobsContainerComponent,
  MiningContainerComponent,
  SearchContainerComponent,
  ContentContainerComponent,
  GeneratorContainerComponent
];

@NgModule({
  imports: [BrowserModule, ComponentCollectionModule],
  declarations: PAGES,
  exports: PAGES
})
export class PagesCollectionModule {}
