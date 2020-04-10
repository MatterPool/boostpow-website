import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from '@pages/home_container/home_container.component';
import { CreateContainerComponent } from '@pages/create_container/create_container.component';
import { JobContainerComponent } from '@pages/job_container/job_container.component';
import { MiningContainerComponent } from '@pages/mining_container/mining_container.component';
import { SearchContainerComponent } from '@pages/search_container/search_container.component';

const routes: Routes = [
  { path: '', component: HomeContainerComponent },
  { path: 'create', component: CreateContainerComponent },
  { path: 'boost/:pow', component: JobContainerComponent },
  { path: 'job/:txid', component: JobContainerComponent },
  { path: 'job/:txid/mining', component: MiningContainerComponent },
  { path: 'search', component: SearchContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
