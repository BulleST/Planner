import { Component, OnInit } from '@angular/core';
import { Loading } from 'src/app/utils/loading';
import { Table } from 'src/app/utils/table';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    
  loading = false;
  constructor(
    private table: Table
  ) { 
    this.table.loading.subscribe(res => this.loading = res);
  }

  ngOnInit(): void {
  }

}
