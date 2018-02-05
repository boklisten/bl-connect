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
	
	constructor(private userDetailService: UserDetailService) {
		this.userDetailService.getById('abc').then((userDetail: UserDetail) => {
			console.log('the res', userDetail);
		}).catch((error: ApiErrorResponse) => {
			console.log('the error::', error);
		});
	}
	
	ngOnInit() {}
}
