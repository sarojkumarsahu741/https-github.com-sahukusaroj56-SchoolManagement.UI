import { Component, EventEmitter } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router"; // Ensure Router and NavigationEnd are imported
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from "primeng/confirmdialog"; // Client's PrimeNG module
// Removed unused imports - components are loaded via routing

@Component({
  selector: "app-root",
  standalone: true, // Make client's AppComponent standalone to match yours
  imports: [RouterOutlet, CommonModule, ConfirmDialogModule],
  templateUrl: "./app.component.html",
  // You might need to adjust styleUrl or add styleUrls depending on your SCSS usage
  styleUrls: ["./app.component.css"], // Example: keep both if needed, or convert your SCSS to CSS
})
export class AppComponent {
  title = "School Management"; // Keep client's title
  showNavbar = true; // Client's logic
  showLoader: boolean = false; // Client's logic

  // Your sidebar collapse logic
  isSidebarCollapsed: boolean = false; // Initial state: sidebar is visible

  constructor(private router: Router) {
    // Client's router logic
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== "/";
      }
    });
  }

  // Your method to toggle the sidebar state
  toggleSidebarState() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Your method to listen to events emitted from the component currently loaded by <router-outlet>
  onOutletLoaded(componentRef: any) {
    if (componentRef && componentRef.toggleSidebar instanceof EventEmitter) {
      componentRef.toggleSidebar.subscribe(() => {
        this.toggleSidebarState();
      });
    }
  }
}
