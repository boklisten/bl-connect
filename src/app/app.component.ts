import {Component, OnInit} from '@angular/core';
import {
	BlApiError, BlapiErrorResponse, BlApiLoginRequiredError, BlApiPermissionDeniedError, Item, OpeningHour,
	UserDetail
} from "bl-model";
import {UserDetailService} from "./user-detail/user-detail.service";
import {ApiErrorResponse} from "./api/api-error-response";
import {TokenService} from "./token/token.service";
import {ItemService} from "./item/item.service";
import {LoginService} from "./login/login.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	
	constructor(private _userDetailService: UserDetailService, private _tokenService: TokenService, private _itemService: ItemService,
				private _loginService: LoginService) {
		const expiredAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjoxNTE3ODUwMzE1fQ._j8hJxRui1pkyQhT-JzMdzM_6YJ9ol1fOQ_T9d70hXI";
		const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjE1MTc4NTAzMTV9.sbE89JxGTtrE0yMx55JNCqouG8qvszaSksWz7Is6880";
		const validAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjo0NjczNjEwNTk4fQ.Os1SlSuxbAdzPNXgvAaJ21Zfj06N0yFyNubKsgY1sio";
		const validRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjQ2NzM2MTA1OTh9.oQ3XpcijM4CUCseI03jOJjqhOEQvJOWBWrv0oeumByA";
		const validUserDetailId = '5a747a43f46fd3653fb1cb1d';
		
		this._tokenService.removeTokens();
		//this._tokenService.addAccessToken(validAccessToken);
		//this._tokenService.addRefreshToken(expiredRefreshToken);
	/*
		this._itemService.getById("5a1d67cdf14cbe78ff047d02").then((item: Item) => {
			console.log('the item', item);
		}).catch((err) => {
			console.log('error...', err);
		});
		

	*/
	
		this._loginService.login('a@b.co', 'password').then(() => {
			console.log('we are logged in!!');
			
			this._userDetailService.getById(validUserDetailId).then((userDetail: UserDetail) => {
				console.log('we did now get user detail!', userDetail);
			}).catch((err: BlApiError) => {
				this.printError(err);
			});
			
			
			
		}).catch((blApiErr: BlApiError) => {
			this.printError(blApiErr);
		});
/*
		this._userDetailService.getById(validUserDetailId).then((userDetail: UserDetail) => {
			console.log('the userDetail', userDetail);
		}).catch((err: BlApiError) => {
			if (err instanceof BlApiLoginRequiredError) {
				console.log('BlLoginRequiredError');
			}
			if (err instanceof BlApiPermissionDeniedError) {
				console.log('BlPermissionDeniedError');
			}
		});
		*/
	}
	
	private printError(blApiErr: BlApiError) {
		if (blApiErr instanceof BlApiLoginRequiredError) {
			console.log('BlLoginRequiredError');
		} else if (blApiErr instanceof BlApiPermissionDeniedError) {
			console.log('BlApiPermissionDeniedError');
		} else {
			console.log('BlApiError: msg: "' +  blApiErr.msg + '"');
		}
	}
	
	ngOnInit() {}
}
