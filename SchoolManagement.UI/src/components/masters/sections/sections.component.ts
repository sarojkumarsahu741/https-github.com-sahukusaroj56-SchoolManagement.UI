import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridColumnVM, ColumnType } from '../../../models/grid-column-vm.model';
import { SectionVM } from '../../../models/masters/section-vm.model';
import { url } from 'inspector';
import { ApiService } from '../../../auth/api.service';
import { HttpMethod } from '../../../models/http-method';
import { DownloadExcelService } from '../../../shared/download-excel.service';
import { GridComponent } from '../../../shared/grid/grid.component';
import { LoadingSpinnerComponent } from "../../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-sections',
  imports: [CommonModule, FormsModule, GridComponent, LoadingSpinnerComponent],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {
  columns: GridColumnVM[] = [
    { field: 'id', name: 'Section Id', hide: true, isSortEnabled: true, columnType: ColumnType.Text, nonToggleColumn: true, nonDownloadableColumn: true },
    { field: 'name', name: 'Section Name', isSortEnabled: true, columnType: ColumnType.Text, nonToggleColumn: true },
    { field: 'isActive', name: 'Status', isSortEnabled: true, columnType: ColumnType.Status },
    { field: 'lastUpdated', name: 'Last Updated', isSortEnabled: true, columnType: ColumnType.Date }
  ];
  pageNumber: number = 1;
  pageSize: number = 10;
  searchText: string = '';
  sortBy: string = 'name';
  sortDirection: string = 'asc';
  sections: SectionVM[] = [];
  savedSections: SectionVM[] = [];
  totalRecords: number = 0;
  isEdit: boolean = false;
  isFullscreen: boolean = false;
  showLoader: boolean = false;

  constructor(private apiService: ApiService, private exportService: DownloadExcelService) {

  }

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.showLoader = true;
    this.apiService.request<any>(HttpMethod.GET, '/Section').subscribe((res) => {
      this.savedSections = res;
      this.sections = res;
      this.totalRecords = res.length;
      this.showLoader = false;
    });
  }

  onFullscreenToggle(isFullscreen: boolean) {
    this.isFullscreen = isFullscreen;
  }

  handleChildEvent(event: { actionName: string, parameter: any }) {
    switch (event.actionName) {
      case 'Export':
        this.showLoader = true;
        let fileName = 'Sections';
        const reportsData = this.getDownloadData();
        let columnNames = this.columns.filter(x => !x.nonDownloadableColumn).map(x => x.name);
        switch (event.parameter) {
          case 'MS-Excel':
            this.exportService.downloadExcel(`Sections.xlsx`, columnNames, reportsData);
            break;
          case 'CSV':
            this.exportService.downloadCSV(fileName, columnNames, reportsData);
            break;
          case 'PDF':
            this.exportService.downloadPDF(fileName, columnNames, reportsData);
            break;
          case 'MS-WORD':
            this.exportService.downloadDocx(fileName, columnNames, reportsData);
            break;
        }
        this.showLoader = false;
        break;
      case 'LoadGrid':
        if (event.parameter == null || (this.pageNumber == event.parameter.pageNumber && this.pageSize == event.parameter.pageSize
          && this.searchText == event.parameter?.searchText && this.sortBy == event.parameter?.sortBy
          && this.sortDirection == event.parameter?.sortDirection)) {
          return;
        }
        this.pageNumber = event.parameter.pageNumber;
        this.pageSize = event.parameter.pageSize;
        this.searchText = event.parameter?.searchText ?? '';
        this.sortBy = event.parameter?.sortBy ?? '';
        this.sortDirection = event.parameter?.sortDirection ?? '';
        this.loadGrid();
        break;
      case 'defaultSearch':
        this.searchText = event.parameter?.searchText ?? '';
        this.sortBy = event.parameter?.sortBy ?? '';
        this.sortDirection = event.parameter?.sortDirection ?? '';
        this.sections = this.savedSections.filter((x: any) => x.name.toLowerCase().includes(this.searchText.toLowerCase()));
        break;
    }
  }

  getDownloadData(): any[] {
    return this.sections.map((res: any) =>
      this.columns.reduce((acc, col) => {
        acc[col.name] = (res as any)[col.field];
        return acc;
      }, {} as any)
    );
  }

}


