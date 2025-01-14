import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import { ApiResponse } from "../api/api-response";
import { BlDocumentService } from "../document/bl-document.service";
import { CachedDocumentService } from "../document/cached-document.service";

interface SimplifiedUserMatch {
	id: string;
	customerA: string;
	customerB: string;
	itemsLockedToMatch: boolean;
}

@Injectable({
	providedIn: "root",
})
export class UserMatchService extends BlDocumentService<SimplifiedUserMatch> {
	constructor(
		private cachedDocumentService: CachedDocumentService,
		private _apiService: ApiService
	) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.userMatches);
	}

	public updateLocksForCustomer(
		customerId: string,
		userMatchesLocked: boolean
	): Promise<ApiResponse> {
		return this._apiService.add(
			BL_CONFIG.collection.userMatches + "/lock",
			{
				customerId,
				userMatchesLocked,
			}
		);
	}
}
