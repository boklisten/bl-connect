

import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {Delivery} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";

@Injectable()
export class DeliveryService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _documentService: DocumentService) {
		this._collection = 'deliveries';
	}

	public getById(id: string): Promise<Delivery> {
		return this._documentService.getById(this._collection, id);
	}

	public add(delivery: Delivery): Promise<Delivery> {
		return this._documentService.add(this._collection, delivery);
	}

	public update(id: string, data: any): Promise<Delivery> {
		return this._documentService.update(this._collection, id, data);
	}
}
