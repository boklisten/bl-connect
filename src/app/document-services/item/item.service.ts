import { Injectable } from "@angular/core";
import { Item } from "@boklisten/bl-model";
import { ApiService } from "../../api/api.service";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import {
	CachedDocumentService,
	CachedDocumentServiceOptions,
} from "../../document/cached-document.service";
import { BlDocumentService } from "../../document/bl-document.service";

@Injectable()
export class ItemService extends BlDocumentService<Item> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.item);
	}
}
