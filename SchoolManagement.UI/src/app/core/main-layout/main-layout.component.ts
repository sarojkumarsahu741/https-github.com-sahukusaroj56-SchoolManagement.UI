import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../../../shared/layout/sidebar/sidebar.component";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: "./main-layout.component.html",
})
export class MainLayoutComponent {
  isSidebarCollapsed: boolean = false;

  toggleSidebarState() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
