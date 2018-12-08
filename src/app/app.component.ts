import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message/message.service";
import { LoginService } from "./login/login.service";
import { UserDetailService } from "./user-detail/user-detail.service";
import { TextBlock, Order, CustomerItem } from "@wizardcoder/bl-model";
import { OrderService } from "./order/order.service";
import { CustomerItemService } from "./customer-item/customer-item.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
	title = "app";

	constructor(
		private messageService: MessageService,
		private LoginService: LoginService,
		private userDetailService: UserDetailService
	) {}

	ngOnInit() {
		/*
		this.LoginService.login("aholskil@gmail.com", "password")
			.then(() => {
				this.messageService
					.sendReminder(
						"5b796677ecc8b04c01982713",
						new Date(2018, 11, 20)
					)
					.then(reminder => {})
					.catch(err => {
						console.log("what the hell", err);
					});
			})
			.catch(() => {
				console.log("could not login...");
			});
     */
	}
}
