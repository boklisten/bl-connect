

import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {Delivery} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";

@Injectable()
export class DeliveryService {
	private _collectionName: string;
	private _documentService: DocumentService<Delivery>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = 'deliveries';
		this._documentService = new DocumentService(this._collectionName, this._apiService);
	}
	
	public getById(id: string): Promise<Delivery> {
		return this._documentService.getById(id);
	}
	
	public add(delivery: Delivery): Promise<Delivery> {
		return this._documentService.add(delivery);
	}
	
	public update(id: string, data: any): Promise<Delivery> {
		return this._documentService.update(id, data);
	}
}
