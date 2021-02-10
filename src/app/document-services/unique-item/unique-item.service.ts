import { Injectable } from "@angular/core";
import { UniqueItem } from "@boklisten/bl-model";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import {
	CachedDocumentService,
	CachedDocumentServiceOptions,
} from "../../document/cached-document.service";
import { BlDocumentService } from "../../document/bl-document.service";

@Injectable()
export class UniqueItemService extends BlDocumentService<UniqueItem> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.uniqueItem);
	}
}
