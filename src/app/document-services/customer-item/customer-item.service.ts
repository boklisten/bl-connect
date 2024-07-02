import { Injectable } from "@angular/core";
import { CustomerItem } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { CachedDocumentService } from "../../document/cached-document.service";
import { BlDocumentService } from "../../document/bl-document.service";
import { ApiService } from "../../api/api.service";

@Injectable()
export class CustomerItemService extends BlDocumentService<CustomerItem> {
	constructor(
		private cachedDocumentService: CachedDocumentService,
		private _apiService: ApiService
	) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.customerItem);
	}

	public async generateCustomerItemReport(options: {
		branchFilter?: string[];
		createdAfter?: Date;
		createdBefore?: Date;
		returned: boolean;
		buyout: boolean;
	}): Promise<unknown[]> {
		return (
			await this._apiService.add(
				BL_CONFIG.collection.customerItem + "/generate-report",
				options
			)
		).data;
	}
}
