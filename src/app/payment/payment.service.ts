

import {BlApiError, BlError, Order, Payment} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class PaymentService {
	
	private _collectionName: string;
	private _documentService: DocumentService<Payment>;
	
	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.payment;
		this._documentService = new DocumentService<Payment>(this._collectionName, this._apiService);
	}
	
	public getById(id: string): Promise<Payment> {
		return this._documentService.getById(id);
	}
	
	public getManyByIds(ids: string[]): Promise<Payment[]> {
		return this._documentService.getManyByIds(ids);
	}
	
	public add(payment: Payment): Promise<Payment> {
		return this._documentService.add(payment);
	}
	
	public update(id: string, data: any): Promise<Payment> {
		return this._documentService.update(id, data);
	}
}
