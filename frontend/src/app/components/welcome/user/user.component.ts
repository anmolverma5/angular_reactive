import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { UserService } from 'src/app/shared/user.service';
import { BtnCellRenderer } from '../../renderer/btn-cell-renderer.component';
function actionCellRenderer(params: { api: { getEditingCells: () => any; }; node: { rowIndex: any; }; }) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell: { rowIndex: any; }) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> update  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit" (click)="assign()"  data-action="edit" > edit  </button>
<button class="action-button delete" data-action="delete" > delete </button>
`;
  }

  return eGui;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  template: `
    <button (click)="btnClickedHandler($event)">Click me!</button>
  `,
})


export class UserComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  is_admin: any;
  params: any;
  columnDefs: ColDef[] = [];
  user: any;
  Data: any;
  frameworkComponents: any;
  defaultColDef: any;
  agInit(params: any): void {
    this.params = params;
  }
  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }
  ngOnInit(): void {
    this.defaultColDef = {
      resizable: true,
    };
    this.columnDefs = [
      // Option 1: using field for getting and setting the value
      { field: 'id', sortable: true, filter: true },
      { field: 'email', sortable: true, filter: true, editable: true },
      { field: 'firstname', sortable: true, filter: true, editable: true },
      { field: 'lastname', sortable: true, filter: true, editable: true },
      { field: 'password', sortable: true, filter: true, editable: true },
      {
        headerName: "action",
        minWidth: 150,
        cellRenderer: BtnCellRenderer,
        editable: false,
        colId: "action",
        headerClass: 'my-header-class',
      },
    ];
  }
  // onCellClicked(params: CellValueChangedEvent) {
  //   var changedData = [params.data];
  //   this.user = params.data;
  //   console.log(this.user);
  // }
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
  onCellValueChanged(params: CellValueChangedEvent) {
    var changedData = [params.data];
    this.user = params.data;
    console.log(this.user);
    params.api.applyTransaction({ update: changedData });
    this.apiService.updateUser(this.user).subscribe(data => {
      console.warn(data)
      var anmol = 'anmol@gmail.com';
    })
  }
  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
  assign() {
    alert('hello');
  }
  rowData: Observable<any[]>;
  constructor(public userService: UserService, private apiService: ApiService, private http: HttpClient) {
    const tokenInfo = this.apiService.getDecodedAccessToken();
    this.is_admin = tokenInfo.is_admin;
    console.warn(tokenInfo.is_admin);
    this.rowData = this.userService.getData();
  }
}

