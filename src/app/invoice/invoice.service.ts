import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { DocumentService } from "../document/document.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import { Invoice } from "@wizardcoder/bl-model";

@Injectable()
export class InvoiceService {
  private _collection: string;

  constructor(private _apiService: ApiService, private _documentService: DocumentService) {
    this._collection = BL_CONFIG.collection.invoice;
  }

  public get(query?: string): Promise<Invoice[]> {
    return this._documentService.get(this._collection, query);
  }

  public getById(id: string): Promise<Invoice[]> {
    return this._documentService.getById(this._collection, id);
  }

  public getManyByIds(ids: string[]): Promise<Invoice[]> {
    return this._documentService.getManyByIds(this._collection, ids);
  }

  public update(id: string, data: any): Promise<Invoice> {
    return this._documentService.update(this._collection, id, data);
  }

  public add(invoice: Invoice): Promise<Invoice> {
    return this._documentService.add(this._collection, invoice);
  }


}
