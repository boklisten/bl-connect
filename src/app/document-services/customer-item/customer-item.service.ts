import { Injectable } from "@angular/core";
import { CustomerItem } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { CachedDocumentService } from "../../document/cached-document.service";
import { BlDocumentService } from "../../document/bl-document.service";
import { ApiResponse } from "../../api/api-response";
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

	public generateCustomerItemReport(options: {
		branchFilter?: string[];
		createdAfter?: string;
		createdBefore?: string;
		returned: boolean;
		buyout: boolean;
	}): Promise<ApiResponse> {
		return this._apiService.add(
			BL_CONFIG.collection.customerItem + "/generate-report",
			options
		);
	}
}
