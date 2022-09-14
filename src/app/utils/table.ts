import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class Table {

    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    selectedItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    selected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

    constructor(
        private toastr: ToastrService,
    ) {
    }

    initialize() {
        this.resetSelection();
    }

    resetSelection() {
        this.selected.next(undefined)
        this.fecharMenuTable();
        this.selectedItems.next([]);
    }

    onRowSelect(event: any) {
        let row: any = event.data;
        if (row != undefined) {
            this.selected.next(row);
            let index = this.selectedItems.value.findIndex(n => n.id == row.id);
            if (index == -1) {
                let selectedItems = this.selectedItems.value;
                selectedItems.push(row);
                this.selectedItems.next(selectedItems);
            }
            this.exibirMenuTable();
        }
    }

    onRowUnselect(event: any) {
        let selectedItems = this.selectedItems.value;
        if (event.data) {
            let row = event.data;
            let index = this.selectedItems.value.findIndex(n => n.id == row.id);
            if (index != -1) {
                selectedItems.splice(index, 1);
                this.selectedItems.next(selectedItems);
            }
        }
        if (selectedItems.length > 0) {
            this.selected.next(selectedItems[selectedItems.length - 1]);
            this.exibirMenuTable();
        }
        else {
            this.selected.next(undefined)
            this.fecharMenuTable();
        }
    }

    onAllRowToggle(event: any) {
        if (event.checked == false) {
            this.selectedItems.next([]);
            this.selected.next(undefined);
        }
        this.fecharMenuTable();
    }

    fecharMenuTable() {
        $('.actions__nav').css({
            'display': 'none',
            'opacity': 0,
            'visibility': 'hidden',
        });
    }


    exibirMenuTable() {
      setTimeout(() => {
        let tr = $('tr.selected'); 
        if (tr) {
            let td = $(tr).find('.td-actions');
            if (td) {
                let top = ($(td).offset()?.top ?? 0);
                let left = ($(td).offset()?.left ?? 0);
                $('.actions__nav').css({
                    'display': 'flex',
                    'top': top + 'px',
                    'left': left + 'px',
                    'opacity': 1,
                    'visibility': 'visible',
                });
            }
        }
      }, 10);
    }

}
