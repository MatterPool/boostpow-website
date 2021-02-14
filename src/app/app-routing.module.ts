import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { TopicsComponent } from './pages/topics/topics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'j', component: JobsComponent },
  { path: 'topics', component: TopicsComponent },
//  { path: 'j/:id', component: JobsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'c/:id', component: ContentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
