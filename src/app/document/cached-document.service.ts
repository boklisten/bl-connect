import {Injectable} from "@angular/core";
import {DocumentService} from "./document.service";
import {BlDocument} from "@wizardcoder/bl-model";
import {SimpleCache} from "../simple-cache/simple-cache.service";


@Injectable()
export class CachedDocumentService<T extends BlDocument> {

	constructor(private _documentService: DocumentService<T>, private _simpleCache: SimpleCache<T>) {

	}

	public get(query?: string): Promise<T[]> {
		return this._documentService.get(query).then((documents: T[]) => {
			for (const document of documents) {
				this._simpleCache.add(document);
			}

			return documents;
		}).catch((err) => {
			throw err;
		});
	}

	public getById(id: string): Promise<T> {
		const cachedObj = this._simpleCache.get(id);

		if (!cachedObj) { // if no cached object, call api
			return this._documentService.getById(id).then((document: T) => {
				this._simpleCache.add(document);
				return document;
			}).catch((e) => {
				throw e;
			});
		}

		return Promise.resolve(cachedObj);
	}

	public getWithOperation(id: string, operation: string): Promise<any> {
		return this._documentService.getWithOperation(id, operation);
	}

	public getManyByIds(ids: string[]): Promise<T[]> {
		const cachedObjects  = [];
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
			return this._documentService.getManyByIds(notCachedObjectIds).then((returnedDocuments: T[]) => {
				for (const returnedDoc of returnedDocuments) {
					this._simpleCache.add(returnedDoc);
					cachedObjects.push(returnedDoc);
				}
				return cachedObjects;
			}).catch((err) => {
				throw err;
			});
		} else {
			return this._documentService.getManyByIds(notCachedObjectIds);
		}
	}

	public update(id: string, data: any): Promise<T> {
		return this._documentService.update(id, data).then((updatedDocument: T) => {
			this._simpleCache.add(updatedDocument);
			return updatedDocument;
		}).catch((err) => {
			throw err;
		});
	}

	public add(doc: T): Promise<T> {
		return this._documentService.add(doc).then((addedDocument: T) => {
			this._simpleCache.add(addedDocument);
			return addedDocument;
		}).catch((err) => {
			throw err;
		});
	}

	public remove(id: string): Promise<T> {
		return this._documentService.remove(id).then((removedDoc) => {
			this._simpleCache.remove(removedDoc.id);
			return removedDoc;
		}).catch((err) => {
			throw err;
		});
	}
}
