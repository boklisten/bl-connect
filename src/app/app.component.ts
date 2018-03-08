import {Component, OnInit} from '@angular/core';
import {
	BlApiError, BlapiErrorResponse, BlApiLoginRequiredError, BlApiPermissionDeniedError, CustomerItem, Item,
	OpeningHour, Order,
	UserDetail
} from "bl-model";
import {UserDetailService} from "./user-detail/user-detail.service";
import {ApiErrorResponse} from "./api/api-error-response";
import {TokenService} from "./token/token.service";
import {ItemService} from "./item/item.service";
import {LoginService} from "./login/login.service";
import {BranchService} from "./branch/branch.service";
import {CustomerItemService} from "./customer-item/customer-item.service";
import {RegisterService} from "./register/register.service";
import {PaymentService} from "./payment/payment.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	
	constructor(private _userDetailService: UserDetailService, private _tokenService: TokenService, private _itemService: ItemService,
				private _loginService: LoginService, private _branchService: BranchService, private _customerItemService: CustomerItemService,
				private _registerService: RegisterService, private _paymentService: PaymentService) {
		const expiredAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjoxNTE3ODUwMzE1fQ._j8hJxRui1pkyQhT-JzMdzM_6YJ9ol1fOQ_T9d70hXI";
		const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjE1MTc4NTAzMTV9.sbE89JxGTtrE0yMx55JNCqouG8qvszaSksWz7Is6880";
		const validAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjo0NjczNjEwNTk4fQ.Os1SlSuxbAdzPNXgvAaJ21Zfj06N0yFyNubKsgY1sio";
		const validRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjQ2NzM2MTA1OTh9.oQ3XpcijM4CUCseI03jOJjqhOEQvJOWBWrv0oeumByA";
		const validUserDetailId = '5a747a43f46fd3653fb1cb1d';
		
		this._tokenService.removeTokens();
		
		
	}
	
	ngOnInit() {
		let orderJson: any = {
			"id": "o1",
			"amount": 370,
			"application": "bl-web",
			"orderItems": [
				{
					"type": "rent",
					"amount": 370,
					"item": "5a1d67cdf14cbe78ff047d02",
					"title": "Signatur 3",
					"rentRate": 0,
					"taxRate": 0,
					"taxAmount": 0,
					"unitPrice": 370,
					"rentInfo": {
						"oneSemester": true,
						"twoSemesters": false
					}
				}
			],
			"branch": "5a1d67cdf14cbe78ff047d00",
			"byCustomer": true,
			"payments": [
				{
					"method": "dibs",
					"amount": 370,
					"confirmed": false,
					"byBranch": false,
					"time": "1"
				}
			],
			"comments": [],
			"active": false,
			"user": {
				"id": "u1"
			},
			"lastUpdated": '1',
			"creationTime": '1'
		};
		
		this._loginService.login('a@b.com', 'password').then(() => {
			this._paymentService.getPaymentId(orderJson as Order).then((paymentId: string) => {
				console.log('we got the paymentId!!!', paymentId);
			}).catch((blApiErr: BlApiError) => {
				console.log('we got error::', blApiErr);
			});
		}).catch(() => {
			console.log('could not login');
		});
		
		/*
		this._registerService.facebookRegister().then(() => {
			console.log('hi there!');
		}).catch((blApiError: BlApiError) => {
			console.log('we fuct up', blApiError);
		});
		*/
	}
	
	private printError(blApiErr: BlApiError) {
		if (blApiErr instanceof BlApiLoginRequiredError) {
			console.log('BlLoginRequiredError');
		} else if (blApiErr instanceof BlApiPermissionDeniedError) {
			console.log('BlApiPermissionDeniedError');
		} else {
			console.log('BlApiError: msg: "' + blApiErr.msg + '"');
		}
	}
}
