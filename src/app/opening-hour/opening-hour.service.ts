import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {OpeningHour} from "@wizardcoder/bl-model";
import {ApiErrorResponse} from "../api/api-error-response";
import {ApiResponse} from "../api/api-response";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class OpeningHourService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService) {
		this._collection = BL_CONFIG.collection.openingHour;
	}

	public getById(id: string): Promise<OpeningHour> {
		return this._cachedDocumentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<OpeningHour[]> {
		return this._cachedDocumentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<OpeningHour> {
		return this._cachedDocumentService.update(this._collection, id, data);
	}

	public add(openingHour: OpeningHour): Promise<OpeningHour> {
		return this._cachedDocumentService.add(this._collection, openingHour);
	}
}

