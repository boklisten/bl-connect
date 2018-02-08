import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {DocumentService} from "../document/document.service";
import {CustomerItem} from "bl-model";

@Injectable()
export class CustomerItemService {
	private _collectionName: string;
	private _documentService: DocumentService<CustomerItem>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.customerItem;
		this._documentService = new DocumentService<CustomerItem>(this._collectionName, this._apiService);
	}
	
	public getById(id: string): Promise<CustomerItem> {
		return this._documentService.getById(id);
	}
	
}
