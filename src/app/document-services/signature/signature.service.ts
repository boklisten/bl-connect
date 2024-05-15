import { Injectable } from "@angular/core";
import {
	SerializedSignature,
	SignatureMetadata,
	UserDetail,
} from "@boklisten/bl-model";
import { UserDetailService } from "../../document-services/user-detail/user-detail.service";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { BlDocumentService } from "../../document/bl-document.service";
import { CachedDocumentService } from "../../document/cached-document.service";

@Injectable()
export class SignatureService extends BlDocumentService<SerializedSignature> {
	constructor(
		private cachedDocumentService: CachedDocumentService,
		private _userDetailService: UserDetailService
	) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.signature);
	}

	public base64EncodeImage(signatureImage: Buffer): string {
		return signatureImage.toString("base64");
	}

	public async hasValidSignature(
		userDetail: UserDetail,
		now: Date
	): Promise<boolean> {
		if (userDetail.signatures.length === 0) {
			return false;
		}

		const latestSignature = await this.getById(userDetail.signatures[0]);
		if (this.isSignatureExpired(latestSignature, now)) {
			return false;
		}

		return (
			this._userDetailService.isUnderage(userDetail, now) ===
			latestSignature.signedByGuardian
		);
	}

	public isSignatureExpired(
		signature: SignatureMetadata,
		now: Date
	): boolean {
		if (!signature.creationTime) {
			return true;
		}
		const oldestAllowedSignatureTime = new Date(
			now.getFullYear(),
			now.getMonth() - SignatureMetadata.NUM_MONTHS_VALID,
			now.getDate()
		);
		return signature.creationTime < oldestAllowedSignatureTime;
	}
}
