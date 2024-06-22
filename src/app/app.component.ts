import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageArchiveComponent } from './page-archive/page-archive.component';
import { PageArticleComponent } from './page-article/page-article.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { NavbarComponent } from './elements/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    PageAboutComponent,
    PageArchiveComponent, 
    PageArticleComponent, 
    PageHomeComponent,
    NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crux-publication-website';
}
