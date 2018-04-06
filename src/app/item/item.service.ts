import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {Item} from "@wizardcoder/bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";

@Injectable()
export class ItemService {
	private _collectionName: string;
	private _documentService: DocumentService<Item>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.item;
		this._documentService = new DocumentService<Item>(this._collectionName, this._apiService);
	}
	
	public get(query?: string): Promise<Item[]> {
		return this._documentService.get(query);
	}
	
	public getById(id: string): Promise<Item> {
		return this._documentService.getById(id);
	}
	
	public getManyByIds(ids: string[]): Promise<Item[]> {
		return this._documentService.getManyByIds(ids);
	}
}

