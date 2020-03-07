import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@application/reducers';

@NgModule({
  imports: [StoreModule.forFeature('applicationInfo', reducers)],
  declarations: [],
  providers: []
})
export class ApplicationModule {}
