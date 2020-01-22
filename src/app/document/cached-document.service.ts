import { Injectable } from "@angular/core";
import { DocumentService } from "./document.service";
import { BlDocument } from "@wizardcoder/bl-model";
import { SimpleCache } from "../simple-cache/simple-cache.service";
import { s } from "@angular/core/src/render3";

export type CachedDocumentServiceOptions = { query?: string; fresh?: boolean };

@Injectable()
export class CachedDocumentService {
	public _documentService: DocumentService;

	constructor(
		private _simpleCache: SimpleCache,
		private _documentServiceInput: DocumentService
	) {
		this._documentService = _documentServiceInput;
	}

	public async get(
		collection: string,
		options?: CachedDocumentServiceOptions
	): Promise<any[]> {
		return this._documentService.get(collection, options.query);
	}

	public getById(
		collection: string,
		id: string,
		options?: CachedDocumentServiceOptions
	): Promise<any> {
		return this._documentService.getById(collection, id);
	}

	public getWithOperation(
		collection: string,
		id: string,
		operation: string,
		options?: CachedDocumentServiceOptions
	): Promise<any> {
		return this._documentService.getWithOperation(
			collection,
			id,
			operation
		);
	}

	public getManyByIds(
		collection: string,
		ids: string[],
		options?: CachedDocumentServiceOptions
	): Promise<any> {
		return this._documentService.getManyByIds(collection, ids);
	}

	public update(collection: string, id: string, data: any): Promise<any> {
		return this._documentService.update(collection, id, data);
	}

	public add(collection: string, doc: any): Promise<any> {
		return this._documentService.add(collection, doc);
	}

	public remove(collection: string, id: string): Promise<any> {
		return this._documentService.remove(collection, id);
	}
}
