

import {BlApiError, BlError, Order, Payment} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {CachedDocumentService} from "../document/cached-document.service";

@Injectable()
export class PaymentService {

	private _collection: string;

	constructor(private _apiService: ApiService, private _documentService: DocumentService) {
		this._collection = BL_CONFIG.collection.payment;
	}

	public getById(id: string): Promise<Payment> {
		return this._documentService.getById(this._collection, id);
  }

  public get(query?: string): Promise<Payment[]> {
    return this._documentService.get(this._collection, query);
  }

	public getManyByIds(ids: string[]): Promise<Payment[]> {
		return this._documentService.getManyByIds(this._collection, ids);
	}

	public add(payment: Payment): Promise<Payment> {
		return this._documentService.add(this._collection, payment);
	}

	public update(id: string, data: any): Promise<Payment> {
		return this._documentService.update(this._collection, id, data);
	}
}
