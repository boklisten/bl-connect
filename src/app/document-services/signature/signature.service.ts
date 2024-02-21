import { Injectable } from "@angular/core";
import { SerializedSignature } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { BlDocumentService } from "../../document/bl-document.service";
import { CachedDocumentService } from "../../document/cached-document.service";

@Injectable()
export class SignatureService extends BlDocumentService<SerializedSignature> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.signature);
	}

	public base64EncodeImage(signatureImage: Buffer): string {
		return signatureImage.toString("base64");
	}
}
