import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { DisplayComponent } from './common/display/display.component';
import { BoostComponent } from './common/boost/boost.component';
import { FooterComponent } from './common/footer/footer.component';

//Pipes
import { BoostNumberFormatPipe } from './_pipes/boostNumberFormat.pipe';

//Directives
import { LazyImgDirective } from './_directives/lazy.directive';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ContentComponent } from './pages/content/content.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { TopicsComponent } from './pages/topics/topics.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    JobsComponent,
    TopicsComponent,
    ContentComponent,
    FooterComponent,
    DisplayComponent,
    BoostComponent,
    BoostNumberFormatPipe,
    LazyImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    FontAwesomeModule,
    NgxExtendedPdfViewerModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      }
    }),
  ],
  providers: [NgxExtendedPdfViewerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
