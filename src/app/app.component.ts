import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard/dashboard.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
