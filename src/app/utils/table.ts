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
		if (this.selected.value)
			this.onRowUnselect(this.selected.value)
		else {
			this.fecharMenuTable();
			this.selected.next(undefined)
		}
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
		}
		this.exibirMenuTable(event);
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
			this.exibirMenuTable($(`td[data-id=${this.selected.value.id}]`))
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

	exibirMenuTable(event: any) {
		let tr;
		if (event.originalEvent) {
			tr = $(event.originalEvent.target).parents('tr');
		} else {
			tr = $(event).parents('tr');
		}
		let td = $(tr).find('.td-actions');
        
		let top = ($(td).offset()?.top ?? 0) - ($(td).height() ?? 0);
		// let left = ($(td).offset()?.left ?? 0);
        let left = ($(tr).parents('.content').width() ?? 0) + ($(tr).parents('.content').offset()?.left ?? 0);
		$('.actions__nav').css({
			'display': 'flex',
			'top': top + 'px',
			'left': left + 'px',
			'opacity': 1,
  			'visibility': 'visible',
		})
	}

}
