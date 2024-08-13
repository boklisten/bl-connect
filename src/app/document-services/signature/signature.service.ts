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
import { ApiService } from "../../api/api.service";

@Injectable()
export class SignatureService extends BlDocumentService<SerializedSignature> {
	constructor(
		private cachedDocumentService: CachedDocumentService,
		private _userDetailService: UserDetailService,
		private _apiService: ApiService
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

		const latestSignature = await this.getById(
			userDetail.signatures[userDetail.signatures.length - 1]
		);
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

	public async addGuardianSignature(
		customerId: string,
		base64EncodedImage: string,
		signingName: string
	): Promise<void> {
		await this._apiService.add(
			BL_CONFIG.collection.signature + "/guardian",
			{ customerId, base64EncodedImage, signingName }
		);
	}

	public async checkGuardianSignature(
		customerId: string
	): Promise<{
		message?: string;
		customerNam?: string;
		guardianSignatureRequired: boolean;
	}> {
		return (
			await this._apiService.add(
				BL_CONFIG.collection.signature + "/check-guardian-signature",
				{ customerId }
			)
		).data[0];
	}
}
