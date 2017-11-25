import {Component, OnInit} from '@angular/core';
import {ItemService} from "./item/item.service";
import {ApiService} from "./api/api.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	
	constructor(private itemService: ItemService, private apiService: ApiService) {
	
	}
	
	ngOnInit() {
	/*
		this.apiService.get('something').then(
			(response: any) => {
				console.log('the response', response);
			},
			(error: any) => {
				console.log('error from apiService', error);
			});
			*/
	}
}
