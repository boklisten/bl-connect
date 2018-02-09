import {Injectable} from '@angular/core';
import {DocumentService} from "../document/document.service";
import {Order} from "bl-model";
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class OrderService {
	private _documentService: DocumentService<Order>;
	private _collectionName: string;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.order;
		this._documentService = new DocumentService<Order>(this._collectionName, this._apiService);
	}
	
	public add(order: Order): Promise<Order> {
		return this._documentService.add(order);
	}
	
	public getById(id: string): Promise<Order> {
		return this._documentService.getById(id);
	}
	
	public update(id: string, data: any): Promise<Order> {
		return this._documentService.update(id, data);
	}
	
}
