import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ColumnType, GridColumnVM, ButtonType } from '../../models/grid-column-vm.model';
import { GridActionVM } from '../../models/grid-action-vm.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MinutesToHHMMPipe } from "../minutes-to-hhmmpipe.pipe";
import { UtcToIstPipe } from "../utc-to-ist.pipe";

@Component({
  selector: 'app-grid',
  imports: [TableModule, FormsModule, CommonModule, InputNumberModule, ButtonModule, TagModule, TooltipModule, CalendarModule, DropdownModule, InputTextModule, MinutesToHHMMPipe, UtcToIstPipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      transition(':enter', [
        animate('200ms ease-in', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class GridComponent {
  @Input() gridVM: any[] = [];
  @Input() selectedgridVM: any[] = [];
  @Input() customSortEnabled: boolean = false;
  @Input() columns: GridColumnVM[] = [];
  @Input() actions: GridActionVM[] = [];
  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalRecords: number = 0;
  @Input() pageNumbers: number[] = [];
  @Input() totalPages: number = 0;
  @Input() sortBy: string = '';
  @Input() sortDirection: string = '';
  @Input() gridSearchText: string = '';
  @Input() Pagination: boolean = false;
  @Input() DefaultOptions: boolean = true;
  @Input() CustomSearch: boolean = false;
  @Input() showAdvancedSearch: boolean = false;
  @Input() currentRowNumber: number = 1;
  @Input() currentPagingSize: number = 10;
  @Input() CustomPagination: boolean = false;
  @Input() Checkbox: boolean = false;
  @Input() showLoader: boolean = false;
  @Input() actionName: string = 'LoadGrid';
  @Input() exportActionName: string = 'Export';
  @Input() showGlobalSearch: boolean = true;
  @Input() searchPlaceHolder: string = 'Search keyword';
  @Input() paginator: boolean = true;
  @Input() showQuickFilters: boolean = false;
  @Input() activeTab: string = 'today';
  @Input() dynamicTabs: any[] = [];
  @Input() showDynamicFilters: boolean = false;
  @Input() selectedDynamicTab: any;
  @Input() isFooterEnabled: boolean = false;
  @Input() totalFooterColumn: string = '';
  @Output() childEvent = new EventEmitter<string>();
  @Output() gridEvent = new EventEmitter<{ actionName: string, parameter: any }>();
  @Output() paginationEvent = new EventEmitter<{ actionName: string, parameter: any }>();
  globalFilters: string[] = [];
  isSortRenderingForFirstTime: number = 1;
  ColumnType = ColumnType;
  ButtonType = ButtonType;
  showToggle: boolean = true;
  downloadFormats: string[] = ['MS-Excel', 'CSV', 'PDF', 'JSON', 'XML', 'MS-WORD'];
  assetCode = '';
  childData: string | undefined;
  rowsPerPageOptions: number[] = [10, 50, 100, 500];
  columnInfo: any[] = [];
  @ViewChild('dt1') table!: Table;
  displaySearchPopup: boolean = false;
  isDesktopView: boolean = false;
  noOfPageNumbersToShow: number = 4;
  @Output() fullscreenToggle = new EventEmitter<boolean>();
  isFullscreen = false;
  searchTextChanged = new Subject<string>();
  lastTableEvent: any = null;
  tableVisible = true;
  showPopup = false;

  // Filter variables
  selectedDate: Date[] | undefined;
  searchKeyword = '';
  selectedCategory: any;

  // Dropdown options
  categories = [
    { name: 'All Categories', value: null },
    { name: 'Finance', value: 'finance' },
    { name: 'Operations', value: 'operations' },
    { name: 'HR', value: 'hr' }
  ];

  // Tab configuration
  tabs = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'thisWeek', label: 'This Week' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' }
  ];

  selectTab(tabId: string) {
    //this.actionName = "QuickFilter";
    this.activeTab = tabId;
    this.sendGridActionToParent({ selectedDate: this.activeTab }, "QuickFilter");
  }

  selectDymanicTab(tabId: string) {
    //this.actionName = "DynamicFilter";
    this.selectedDynamicTab = tabId;
    this.sendGridActionToParent({ selectedDate: this.selectedDynamicTab }, "DynamicFilter");
  }

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
  }

  isSameTableEvent(event1: any, event2: any): boolean {
    if (!event1 || !event2) return false;
    return (
      event1.first === event2.first &&
      event1.rows === event2.rows &&
      event1.sortField === event2.sortField &&
      event1.sortOrder === event2.sortOrder &&
      JSON.stringify(event1.filters) === JSON.stringify(event2.filters)
    );
  }


  loadUsers(event: any) {
    if (this.isSameTableEvent(event, this.lastTableEvent)) {
      return;
    }

    this.lastTableEvent = { ...event };
    if (!this.customSortEnabled) {
      this.sortBy = event.sortField;
      this.sortDirection = event.sortOrder == 1 ? 'asc' : 'desc';
      this.gridVM.sort((a, b) => {
        const valueA = a[this.sortBy];
        const valueB = b[this.sortBy];

        // Normalize string comparison
        const valA = (typeof valueA === 'string') ? valueA.toLowerCase() : valueA;
        const valB = (typeof valueB === 'string') ? valueB.toLowerCase() : valueB;

        let result = 0;
        if (valA < valB) result = -1;
        else if (valA > valB) result = 1;

        return this.sortDirection === 'asc' ? result : -result;
      });
      return;
    }
    this.pageNumber = (event.first / event.rows) + 1;
    this.pageSize = event.rows;
    this.sortBy = event.sortField;
    this.sortDirection = event.sortOrder == 1 ? 'asc' : 'desc';
    this.sendGridActionToParent({ pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection, searchText: this.gridSearchText, selectedDate: this.activeTab }, this.actionName);
  }

  ngOnInit() {
    this.globalFilters = this.columns.map(x => x.field);
    this.columns.filter(x => !x.hide && !x.nonToggleColumn).forEach(x => {
      this.columnInfo.push({ key: x.name, value: true });
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isDesktopView = !result.matches;
      this.noOfPageNumbersToShow = this.isDesktopView ? 4 : 2;
    });
    this.totalPages = 5;
    this.searchTextChanged.pipe(
      debounceTime(400)
    ).subscribe(value => {
      this.gridSearchText = value;
      this.onGridSearchFilter(value);
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTextChanged.next(value);
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.fullscreenToggle.emit(this.isFullscreen);
  }


  sendGridDataToParent(actionName: string) {
    this.childEvent.emit(actionName);
  }

  sendGridActionToParent(value: any, actionName: string) {
    let parameter = value;
    if (actionName == 'View') {
      parameter = { pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection, id: value };
    }
    this.gridEvent.emit({ actionName: actionName, parameter: parameter });
  }

  customSort(event: SortEvent) {
    if (this.isSortRenderingForFirstTime == 2) {
      this.isSortRenderingForFirstTime = 1;
      return;
    }
    this.isSortRenderingForFirstTime += 1;
    if (!event || !event.data || !event.field || typeof event.order !== 'number') {
      return;
    }
    this.sortBy = event.field;
    this.sortDirection = event.order == 1 ? 'asc' : 'desc';
  }

  // your-component.component.ts
  getImageUrl(col: any, rowData: any): string {
    const imageUrl = (col?.imageUrl ?? '') + (rowData[col?.imageField ?? ''] ?? '');
    return imageUrl;
  }

  getColumnValue(key: string): boolean {
    const column = this.columnInfo.find(col => col.key === key);
    return column ? column.value : false;
  }

  onGridSearchFilter(event: string) {
    if (!this.customSortEnabled) {
      this.sendGridActionToParent({ sortBy: this.sortBy, sortDirection: this.sortDirection, searchText: this.gridSearchText }, 'defaultSearch');
    }
    else if (this.CustomSearch) {
      this.sendGridActionToParent({ pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection, searchText: this.gridSearchText }, this.actionName);
    }
    else {
      this.sendGridActionToParent({ pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection, searchText: this.gridSearchText }, this.actionName);
    }
  }

  unSelectToggleAll() {
    this.showToggle = !this.columnInfo.some(x => !x.value);
  }

  hideOrShowColumn() {
    this.columnInfo.forEach(x => {
      x.value = this.showToggle;
    });
  }


  clear() {
    this.gridSearchText = '';
    this.pageNumber = 1;
    this.sortBy = '';
    this.sortDirection = '';
    if (this.actionName == "DynamicFilter") {
      this.sendGridActionToParent({ selectedDate: this.selectedDynamicTab }, 'LoadGrid');
    }
    else {
      this.sendGridActionToParent({ pageNumber: this.pageNumber, pageSize: this.pageSize, sortBy: this.sortBy, sortDirection: this.sortDirection, searchText: this.gridSearchText }, this.actionName);
    }
    this.table.clear();
  }

  getSeverity(isActive: boolean): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    return isActive ? 'success' : 'danger';
  }

  reloadGrid() {
    this.pageNumber = 1;
    this.sortBy = '';
    this.sortDirection = '';
    this.clear();
    this.sendGridActionToParent("", "ClearAdvancedSearch");
  }

  onSelectionChange(selectedRows: any[]) {
    this.sendGridActionToParent(selectedRows, "ApprovalRows");
  }

  refreshTable(resetFilters = false) {
    this.tableVisible = false;

    setTimeout(() => {
      this.columns.filter(x => !x.hide && !x.nonToggleColumn).forEach(x => {
        this.columnInfo.push({ key: x.name, value: true });
      });
      this.tableVisible = true;
      if (resetFilters) {
        setTimeout(() => {
          this.table?.clear();
        });
      }
    });
  }

  showdvancedSearchPopup() {
    this.sendGridActionToParent('', "ShowAdvancedSearch");
  }

  getColumnTotal(col: any): number {
    const field = col.field;
    return this.gridVM.reduce((sum, row) => {
      const val = Number(row[field]);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }


}
