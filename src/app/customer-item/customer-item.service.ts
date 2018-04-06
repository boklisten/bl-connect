import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CustomerItem} from "@wizardcoder/bl-model";

@Injectable()
export class CustomerItemService {
	private _collectionName: string;
	private _documentService: DocumentService<CustomerItem>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.customerItem;
		this._documentService = new DocumentService<CustomerItem>(this._collectionName, this._apiService);
	}
	
	
	public add(customerItem: CustomerItem): Promise<CustomerItem> {
		return this._documentService.add(customerItem);
	}
	
	public getById(id: string): Promise<CustomerItem> {
		return this._documentService.getById(id);
	}
	
	public getManyByIds(ids: string[]): Promise<CustomerItem[]> {
		return this._documentService.getManyByIds(ids);
	}
	
	public update(id: string, data: any): Promise<CustomerItem> {
		return this._documentService.update(id, data);
	}
	
}
