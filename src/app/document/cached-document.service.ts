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

	public get(
		collection: string,
		options?: CachedDocumentServiceOptions
	): Promise<any[]> {
		if (!options) options = { query: null, fresh: false };
		const queryString = !options.query ? "" : options.query;
		const cachedCollection: {
			id: string;
			documentIds: string[];
		} = this._simpleCache.get(collection + queryString);

		if (cachedCollection) {
			const returnObjects = [];

			for (const cachedObjId of cachedCollection.documentIds) {
				let cachedObj = undefined;

				if (options.fresh) {
					this._simpleCache.remove(cachedObjId);
				} else {
					cachedObj = this._simpleCache.get(cachedObjId);
				}

				if (!cachedObj) {
					break;
				} else {
					returnObjects.push(cachedObj);
				}
			}

			if (returnObjects.length === cachedCollection.documentIds.length) {
				return Promise.resolve(returnObjects);
			}
		}

		return this._documentService
			.get(collection, options.query)
			.then((documents: any[]) => {
				const documentIds = [];

				for (const document of documents) {
					documentIds.push(document.id);
					this._simpleCache.add(document);
				}

				const cachedRequestObj = {
					id: collection + queryString,
					documentIds: documentIds
				};
				this._simpleCache.add(cachedRequestObj);

				return documents;
			})
			.catch(err => {
				throw err;
			});
	}

	public getById(
		collection: string,
		id: string,
		options?: CachedDocumentServiceOptions
	): Promise<any> {
		const cachedObj = this._simpleCache.get(id);

		if (!cachedObj) {
			// if no cached object, call api
			return this._documentService
				.getById(collection, id)
				.then((document: any) => {
					this._simpleCache.add(document);
					return document;
				})
				.catch(e => {
					throw e;
				});
		}

		return Promise.resolve(cachedObj);
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
		const cachedObjects = [];
		const notCachedObjectIds = [];

		for (const id of ids) {
			const cachedObj = this._simpleCache.get(id);

			if (cachedObj) {
				cachedObjects.push(cachedObj);
			} else {
				notCachedObjectIds.push(id);
			}
		}

		if (cachedObjects.length === ids.length) {
			return Promise.resolve(cachedObjects);
		} else if (cachedObjects.length > 0) {
			return this._documentService
				.getManyByIds(collection, notCachedObjectIds)
				.then((returnedDocuments: any[]) => {
					for (const returnedDoc of returnedDocuments) {
						this._simpleCache.add(returnedDoc);
						cachedObjects.push(returnedDoc);
					}
					return cachedObjects;
				})
				.catch(err => {
					throw err;
				});
		} else {
			return this._documentService
				.getManyByIds(collection, notCachedObjectIds)
				.then((returnedDocuments: any[]) => {
					for (const returnedDocument of returnedDocuments) {
						this._simpleCache.add(returnedDocument);
					}
					return returnedDocuments;
				})
				.catch(err => {
					throw err;
				});
		}
	}

	public update(collection: string, id: string, data: any): Promise<any> {
		return this._documentService
			.update(collection, id, data)
			.then(updatedDocument => {
				this._simpleCache.add(updatedDocument);
				return updatedDocument;
			})
			.catch(err => {
				throw err;
			});
	}

	public add(collection: string, doc: any): Promise<any> {
		return this._documentService
			.add(collection, doc)
			.then(addedDocument => {
				this._simpleCache.add(addedDocument);
				return addedDocument;
			})
			.catch(err => {
				throw err;
			});
	}

	public remove(collection: string, id: string): Promise<any> {
		return this._documentService
			.remove(collection, id)
			.then(removedDoc => {
				this._simpleCache.remove(removedDoc.id);
				return removedDoc;
			})
			.catch(err => {
				throw err;
			});
	}
}
