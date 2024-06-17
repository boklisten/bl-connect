import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import { ApiResponse } from "../api/api-response";
import { BlDocumentService } from "../document/bl-document.service";
import { Match } from "@boklisten/bl-model";
import { CachedDocumentService } from "../document/cached-document.service";

@Injectable({
	providedIn: "root",
})
export class MatchService extends BlDocumentService<Match> {
	constructor(
		private cachedDocumentService: CachedDocumentService,
		private _apiService: ApiService
	) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.match);
	}

	public updateLocksForCustomer(
		customerId: string,
		userMatchesLocked: boolean
	): Promise<ApiResponse> {
		return this._apiService.add(BL_CONFIG.collection.match + "/lock", {
			customerId,
			userMatchesLocked,
		});
	}
}
