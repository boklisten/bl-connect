import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CustomerItem} from "@wizardcoder/bl-model";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class CustomerItemService {
	private _collectionName: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService<CustomerItem>) {
		this._collectionName = BL_CONFIG.collection.customerItem;
		_cachedDocumentService._documentService = new DocumentService<CustomerItem>(this._collectionName, this._apiService);
	}


	public add(customerItem: CustomerItem): Promise<CustomerItem> {
		return this._cachedDocumentService.add(customerItem);
	}

	public getById(id: string): Promise<CustomerItem> {
		return this._cachedDocumentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<CustomerItem[]> {
		return this._cachedDocumentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<CustomerItem> {
		return this._cachedDocumentService.update(id, data);
	}

}
