import { Injectable } from "@angular/core";
import { DocumentService } from "../document/document.service";
import { ApiService } from "../api/api.service";
import { BL_CONFIG } from "../bl-connect/bl-config";
import {
	CachedDocumentService,
	CachedDocumentServiceOptions
} from "../document/cached-document.service";
import { BlDocument } from "@wizardcoder/bl-model";

@Injectable()
export class BlDocumentService<T extends BlDocument> {
	protected _collection: string;

	constructor(protected _cachedDocumentService: CachedDocumentService) {}

	public get(options?: CachedDocumentServiceOptions): Promise<T[]> {
		return this._cachedDocumentService.get(this._collection, options);
	}

	public getById(id: string, options?: CachedDocumentService): Promise<T> {
		return this._cachedDocumentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<T[]> {
		return this._cachedDocumentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<T> {
		return this._cachedDocumentService.update(this._collection, id, data);
	}

	public add(data: T): Promise<T> {
		return this._cachedDocumentService.add(this._collection, data);
	}

	protected setCollection(name: string) {
		this._collection = name;
	}
}
