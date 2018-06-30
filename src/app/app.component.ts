import {Component, OnInit} from '@angular/core';
import {
	BlApiError, BlapiErrorResponse, BlApiLoginRequiredError, BlApiPermissionDeniedError, CustomerItem, Item,
	OpeningHour, Order, UserDetail, Payment, Branch
} from "@wizardcoder/bl-model";
import {UserDetailService} from "./user-detail/user-detail.service";
import {ApiErrorResponse} from "./api/api-error-response";
import {TokenService} from "./token/token.service";
import {ItemService} from "./item/item.service";
import {LoginService} from "./login/login.service";
import {BranchService} from "./branch/branch.service";
import {CustomerItemService} from "./customer-item/customer-item.service";
import {RegisterService} from "./register/register.service";
import {PaymentService} from "./payment/payment.service";
import {OrderService} from "./order/order.service";
import {PasswordResetService} from "./password-reset/password-reset.service";
import {EmailValidationService} from "./email-validation/email-validation.service";
import {SimpleCache} from "./simple-cache/simple-cache.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';

	constructor(private _userDetailService: UserDetailService, private _tokenService: TokenService, private _itemService: ItemService,
				private _loginService: LoginService, private _branchService: BranchService, private _customerItemService: CustomerItemService,
				private _registerService: RegisterService, private _paymentService: PaymentService, private _orderService: OrderService,
				private _passwordResetService: PasswordResetService,
				private _emailValidationService: EmailValidationService,
				private _simpleCache: SimpleCache<any>
				) {
		const expiredAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjoxNTE3ODUwMzE1fQ._j8hJxRui1pkyQhT-JzMdzM_6YJ9ol1fOQ_T9d70hXI";
		const expiredRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTAyNTUsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjE1MTc4NTAzMTV9.sbE89JxGTtrE0yMx55JNCqouG8qvszaSksWz7Is6880";
		const validAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJwZXJtaXNzaW9uIjoiY3VzdG9tZXIiLCJkZXRhaWxzIjoiNWE3NDdhNDNmNDZmZDM2NTNmYjFjYjFkIiwiZXhwIjo0NjczNjEwNTk4fQ.Os1SlSuxbAdzPNXgvAaJ21Zfj06N0yFyNubKsgY1sio";
		const validRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2tsaXN0ZW4uY28iLCJhdWQiOiJib2tsaXN0ZW4uY28iLCJpYXQiOjE1MTc4NTA1OTgsInN1YiI6InUjZDViY2U1NjUxNTczNGNmNjg5ZTFiOWU2NzBlY2YyMTIiLCJ1c2VybmFtZSI6ImFAYi5jb20iLCJleHAiOjQ2NzM2MTA1OTh9.oQ3XpcijM4CUCseI03jOJjqhOEQvJOWBWrv0oeumByA";
		const validUserDetailId = '5a747a43f46fd3653fb1cb1d';

		this._tokenService.removeTokens();


	}

	ngOnInit() {
		/*

		const startTime = new Date().getTime();
		this._branchService.getById('5b0e74644457b345a930424c').then((branch: Branch) => {
			const firstReturnTime = new Date().getTime();
			console.log('the first call was ', (firstReturnTime - startTime), 'ms');

			const secondStartTime = new Date().getTime();

			this._branchService.getById('5b0e74644457b345a930424c').then((branchTwo) => {
				const secondReturnTime = new Date().getTime();
				console.log('the second call was ', (secondReturnTime - secondStartTime), 'ms');

			}).catch((err) => {
				console.log('could not get branch2', err);
			});
		}).catch((err1) => {
			console.log('could not get branch1', err1);
		});
		*/
		// const ids = ["5b0e74644457b345a930424c", "5b0e74644457b345a930424d", "5b0e74644457b345a930424e", "5b0e74644457b345a930424f",  "5b0e74644457b345a9304250", "5b0e74644457b345a9304251", "5b0e74644457b345a9304252", "5b0e74644457b345a9304253", "5b0e74644457b345a9304254", "5b0e74644457b345a9304255"];
/*
		const startTime = new Date().getTime();
		this._branchService.getManyByIds(ids).then((branches: Branch[]) => {
			const firstReturnTime = new Date().getTime();
			console.log('the first call was ', (firstReturnTime - startTime), 'ms');
			const secondStartTime = new Date().getTime();
			this._branchService.getManyByIds(ids).then((branchesTwo: Branch[]) => {
				const secondReturnTime = new Date().getTime();
				console.log('the second call was ', (secondReturnTime - secondStartTime), 'ms');

			}).catch((err) => {
				console.log('could not get branch2', err);
			});
		}).catch((err1) => {
			console.log('could not get branch1', err1);
		});*/
/*
		const startTime2 = new Date().getTime();
		this._branchService.getManyByIds(ids).then((branches: Branch[]) => {
			const firstReturnTime = new Date().getTime();
			console.log('the first call was ', (firstReturnTime - startTime2), 'ms');


			setTimeout(() => {
				const secondStartTime = new Date().getTime();
				this._branchService.getManyByIds(ids).then((branchesTwo: Branch[]) => {
					const secondReturnTime = new Date().getTime();
					console.log('the second call was ', (secondReturnTime - secondStartTime), 'ms');

				}).catch((err) => {
					console.log('could not get branch2', err);
				});
			}, 1000);
		}).catch((err1) => {
			console.log('could not get branch1', err1);
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
