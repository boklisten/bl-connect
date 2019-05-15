import { Injectable } from "@angular/core";
import { CustomerItem } from "@wizardcoder/bl-model";
import { ApiService } from "../../api/api.service";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import {
	CachedDocumentService,
	CachedDocumentServiceOptions
} from "../../document/cached-document.service";
import { BlDocumentService } from "../../document/bl-document.service";

@Injectable()
export class CustomerItemService extends BlDocumentService<CustomerItem> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.customerItem);
	}
}