import { Injectable } from "@angular/core";
import { Booking } from "@boklisten/bl-model";
import { ApiService } from "../../api/api.service";
import { BL_CONFIG } from "../../bl-connect/bl-config";
import { BlDocumentService } from "../../document/bl-document.service";
import {
	CachedDocumentService,
	CachedDocumentServiceOptions
} from "../../document/cached-document.service";

@Injectable()
export class BookingService extends BlDocumentService<Booking> {
	constructor(private cachedDocumentService: CachedDocumentService) {
		super(cachedDocumentService);
		this.setCollection(BL_CONFIG.collection.booking);
	}
}
