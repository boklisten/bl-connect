import { Component, OnInit } from "@angular/core";
import { MessageService } from "./document-services/message/message.service";
import { LoginService } from "./login/login.service";
import { UserDetailService } from "./document-services/user-detail/user-detail.service";
import { TextBlock, Order, CustomerItem } from "@boklisten/bl-model";
import { OrderService } from "./document-services/order/order.service";
import { CustomerItemService } from "./document-services/customer-item/customer-item.service";
import { BranchService } from "./document-services/branch/branch.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	title = "app";

	constructor(
		private messageService: MessageService,
		private LoginService: LoginService,
		private userDetailService: UserDetailService,
		private branchItemService: BranchService
	) {}

	ngOnInit() {
		this.LoginService.login("aholskil@gmail.com", "password")
			.then(() => {
				this.branchItemService
					.get()
					.then((items) => {
						console.log("got!", items);
					})
					.catch((err) => {
						console.log("err", err);
					});
			})
			.catch(() => {
				console.log("could not login...");
			});
	}
}
