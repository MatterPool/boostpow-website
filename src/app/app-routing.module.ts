import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContainerComponent } from '@pages/home_container/home_container.component';
import { JobsContainerComponent } from '@pages/jobs_container/jobs_container.component';
import { SearchContainerComponent } from '@pages/search_container/search_container.component';
import { ContentContainerComponent } from '@pages/content_container/content_container.component';
import { GeneratorContainerComponent } from '@pages/generator_container/generator_container.component';

const routes: Routes = [
  { path: '', component: HomeContainerComponent },
  { path: 'jobs/:txid', component: JobsContainerComponent },
  { path: 'search', component: SearchContainerComponent },
  { path: 'c/:contenthex', component: ContentContainerComponent },
  { path: 'bot', component: GeneratorContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

