import {Injectable} from '@angular/core';
import {DocumentService} from "../document/document.service";
import {Order} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class OrderService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _documentService: DocumentService) {
		this._collection = BL_CONFIG.collection.order;
	}

	public add(order: Order): Promise<Order> {
		return this._documentService.add(this._collection, order);
	}

	public getById(id: string): Promise<Order> {
		return this._documentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<Order[]> {
		return this._documentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<Order> {
		return this._documentService.update(this._collection, id, data);
	}

	public getAll(query: string): Promise<Order[]> {
		return this._documentService.get(this._collection, query);
	}

}
