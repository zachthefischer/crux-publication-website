import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './nx-welcome.component.html',
  styleUrl: './app.component.css',
})
export class NxWelcomeComponent {}
