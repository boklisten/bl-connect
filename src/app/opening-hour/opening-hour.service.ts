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
	private _collectionName: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService<OpeningHour>) {
		this._collectionName = BL_CONFIG.collection.openingHour;
		_cachedDocumentService._documentService = new DocumentService<OpeningHour>(this._collectionName, this._apiService);
	}

	public getById(id: string): Promise<OpeningHour> {
		return this._cachedDocumentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<OpeningHour[]> {
		return this._cachedDocumentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<OpeningHour> {
		return this._cachedDocumentService.update(id, data);
	}

	public add(openingHour: OpeningHour): Promise<OpeningHour> {
		return this._cachedDocumentService.add(openingHour);
	}
}

