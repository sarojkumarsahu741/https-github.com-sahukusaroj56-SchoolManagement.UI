import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Ensure RouterOutlet is imported
import { SidebarComponent } from '../../../../src/shared/layout/sidebar/sidebar.component'; // Your sidebar component
// If you need to handle sidebar collapse logic here:
// import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  // Make sure to include all necessary imports for this layout component
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'] // Or .css
})
export class MainLayoutComponent {
  // If sidebar collapse is controlled from here
  isSidebarCollapsed: boolean = false;

  // If sidebar can toggle this state
  toggleSidebarState() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
