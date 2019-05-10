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
		if (!options) options = { query: null, fresh: false };
		const queryString = !options.query ? "" : options.query;

		try {
			const cachedDocuments = this.getCachedDocuments(
				collection,
				queryString,
				options
			);

			if (cachedDocuments) {
				return cachedDocuments;
			}
		} catch (e) {
			throw e;
		}

		try {
			const documents = await this._documentService.get(
				collection,
				options.query
			);

			this.addDocumentsToCache(collection, queryString, documents);

			return documents;
		} catch (e) {
			throw e;
		}
	}

	private addDocumentsToCache(
		collection: string,
		query: string,
		documents: any[]
	) {
		const documentIds = [];

		for (const document of documents) {
			documentIds.push(document.id);
			this._simpleCache.add(document);
		}

		const cachedRequestObj = {
			id: collection + query,
			documentIds: documentIds
		};
		this._simpleCache.add(cachedRequestObj);
	}

	private getCachedDocuments(
		collection: string,
		query: string,
		options?: CachedDocumentServiceOptions
	) {
		const cachedCollection: {
			id: string;
			documentIds: string[];
		} = this._simpleCache.get(collection + query);

		if (cachedCollection) {
			const cachedObjects = [];

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
					cachedObjects.push(cachedObj);
				}
			}

			if (cachedObjects.length === cachedCollection.documentIds.length) {
				return cachedObjects;
			}
		}
		return null;
	}

	public getById(
		collection: string,
		id: string,
		options?: CachedDocumentServiceOptions
	): Promise<any> {
		let cachedObj = null;

		if (options && options.fresh) {
			this._simpleCache.remove(id);
		} else {
			cachedObj = this._simpleCache.get(id);
		}

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
			let cachedObj = null;

			if (options && options.fresh) {
				cachedObj = null;
				this._simpleCache.remove(id);
			} else {
				cachedObj = this._simpleCache.get(id);
			}

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
