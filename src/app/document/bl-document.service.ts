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

	public getById(
		id: string,
		options?: CachedDocumentServiceOptions
	): Promise<T> {
		return this._cachedDocumentService.getById(
			this._collection,
			id,
			options
		);
	}

	public getWithOperation(
		id: string,
		operation: string,
		options?: CachedDocumentServiceOptions
	): Promise<T[]> {
		return this._cachedDocumentService.getWithOperation(
			this._collection,
			id,
			operation,
			options
		);
	}

	public getManyByIds(
		ids: string[],
		options?: CachedDocumentServiceOptions
	): Promise<T[]> {
		return this._cachedDocumentService.getManyByIds(
			this._collection,
			ids,
			options
		);
	}

	public update(id: string, data: any): Promise<T> {
		return this._cachedDocumentService.update(this._collection, id, data);
	}

	public updateWithOperation(
		id: string,
		data: any,
		operation: string
	): Promise<T> {
		return this._cachedDocumentService.updateWithOperation(
			this._collection,
			id,
			data,
			operation
		);
	}

	public add(data: T): Promise<T> {
		return this._cachedDocumentService.add(this._collection, data);
	}

	public remove(id: string): Promise<T> {
		return this._cachedDocumentService.remove(this._collection, id);
	}

	protected setCollection(name: string) {
		this._collection = name;
	}
}
