import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {OpeningHour} from "bl-model";
import {ApiErrorResponse} from "../api/api-error-response";
import {ApiResponse} from "../api/api-response";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";

@Injectable()
export class OpeningHourService {
	private _collectionName: string;
	private _documentService: DocumentService<OpeningHour>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.openingHour;
		this._documentService = new DocumentService<OpeningHour>(this._collectionName, this._apiService);
	}
	
	public getById(id: string): Promise<OpeningHour> {
		return this._documentService.getById(id);
	}
}

