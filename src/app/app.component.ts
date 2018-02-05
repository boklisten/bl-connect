import {Component, OnInit} from '@angular/core';
import {OpeningHour, UserDetail} from "bl-model";
import {UserDetailService} from "./user-detail/user-detail.service";
import {ApiErrorResponse} from "./api/api-error-response";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	
	constructor() {
	}
	
	ngOnInit() {}
}
