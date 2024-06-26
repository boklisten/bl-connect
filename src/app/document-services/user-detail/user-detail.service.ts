import { Injectable } from "@angular/core";
import { BlApiError, UserDetail } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { BlDocumentService } from "../../document/bl-document.service";
import { CachedDocumentService } from "../../document/cached-document.service";

@Injectable()
export class UserDetailService extends BlDocumentService<UserDetail> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.userDetail);
	}

	public isValid(
		id: string
	): Promise<{ valid: boolean; invalidFields?: string[] }> {
		return this._cachedDocumentService
			.getWithOperation(this._collection, id, "valid", { fresh: true })
			.then(
				(userDetailValidObject: {
					valid: boolean;
					invalidFields?: string[];
				}) => {
					return userDetailValidObject;
				}
			)
			.catch((blApiError: BlApiError) => {
				throw blApiError;
			});
	}

	public isUnderage(userDetail: UserDetail, now: Date): boolean {
		const latestAdultBirthDate = new Date(
			now.getFullYear() - 18,
			now.getMonth(),
			now.getDate()
		);

		return userDetail.dob > latestAdultBirthDate;
	}
}
