import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CustomerItem} from "@wizardcoder/bl-model";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class CustomerItemService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _documentService: DocumentService) {
		this._collection = BL_CONFIG.collection.customerItem;
	}

	public add(customerItem: CustomerItem): Promise<CustomerItem> {
		return this._documentService.add(this._collection, customerItem);
  }

  public get(query?: string): Promise<CustomerItem[]> {
    return this._documentService.get(this._collection, query);
  }

	public getById(id: string): Promise<CustomerItem> {
		return this._documentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<CustomerItem[]> {
		return this._documentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<CustomerItem> {
		return this._documentService.update(this._collection, id, data);
	}

}
