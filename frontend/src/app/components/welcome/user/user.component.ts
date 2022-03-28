import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  is_admin: any;
  columnDefs: ColDef[] = [];
  user: any;
  ngOnInit(): void {
    this.columnDefs = [
      // Option 1: using field for getting and setting the value
      { field: 'id', sortable: true, filter: true },
      { field: 'email', sortable: true, filter: true, editable: true },
      { field: 'firstname', sortable: true, filter: true, editable: true },
      { field: 'lastname', sortable: true, filter: true, editable: true },
      { field: 'password', sortable: true, filter: true, editable: true },

      // Options 2: using valueGetter and valueSetter - value getter used to get data
      {
        valueGetter: params => {
          return params.data.name;
        }
      }
    ];
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

  rowData: Observable<any[]>;
  constructor(public userService: UserService, private apiService: ApiService, private http: HttpClient) {
    const tokenInfo = this.apiService.getDecodedAccessToken();
    this.is_admin = tokenInfo.is_admin;
    console.warn(tokenInfo.is_admin);
    this.rowData = this.userService.getData();
  }


}
