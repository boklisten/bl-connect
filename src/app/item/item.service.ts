import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {Item} from "@wizardcoder/bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class ItemService {
	private _collectionName: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService<any>) {
		this._collectionName = BL_CONFIG.collection.item;
		_cachedDocumentService._documentService = new DocumentService<Item>(this._collectionName, this._apiService);
	}

	public get(query?: string): Promise<Item[]> {
		return this._cachedDocumentService.get(query);
	}

	public getById(id: string): Promise<Item> {
		return this._cachedDocumentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<Item[]> {
		return this._cachedDocumentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<Item> {
		return this._cachedDocumentService.update(id, data);
	}

	public add(item: Item): Promise<Item> {
		return this._cachedDocumentService.add(item);
	}
}

