import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageArchiveComponent } from './page-archive/page-archive.component';
import { PageArticleComponent } from './page-article/page-article.component';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  { path: 'about', component: PageAboutComponent },
  { path: 'archive', component: PageArchiveComponent },
  { path: 'article/:id', component: PageArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }