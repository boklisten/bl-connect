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
	private _collection: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService) {
		this._collection = BL_CONFIG.collection.item;
	}

	public get(query?: string): Promise<Item[]> {
		return this._cachedDocumentService.get(this._collection, query);
	}

	public getById(id: string): Promise<Item> {
		return this._cachedDocumentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<Item[]> {
		return this._cachedDocumentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<Item> {
		return this._cachedDocumentService.update(this._collection, id, data);
	}

	public add(item: Item): Promise<Item> {
		return this._cachedDocumentService.add(this._collection, item);
	}
}

