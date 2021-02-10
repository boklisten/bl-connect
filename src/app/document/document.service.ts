import { Injectable } from "@angular/core";
import {
	BlApiError,
	BlDocument,
	BlApiNotFoundError,
} from "@boklisten/bl-model";
import { ApiResponse } from "../api/api-response";
import { isArray } from "util";
import { ApiService } from "../api/api.service";

@Injectable()
export class DocumentService {
	constructor(private _apiService: ApiService) {}

	public get(collection: string, query?: string): Promise<any[]> {
		if (!collection) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService.get(collection, query).then(
				(res: ApiResponse) => {
					this.getDocsIfValid(res)
						.then((docs: any[]) => {
							resolve(docs);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				},
				(error: BlApiError) => {
					reject(error);
				}
			);
		});
	}

	public getById(collection: string, id: string): Promise<any> {
		if (!collection || !id) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService.getById(collection, id).then(
				(res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				},
				(error: BlApiError) => {
					reject(error);
				}
			);
		});
	}

	public getWithOperation(
		collection: string,
		id: string,
		operation: string
	): Promise<any> {
		if (!collection || !id || !operation) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService
				.getWithOperation(collection, id, operation)
				.then((res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiError: BlApiError) => {
							reject(blApiError);
						});
				})
				.catch((err: BlApiError) => {
					reject(err);
				});
		});
	}

	public async getManyByIds(collection, ids: string[]): Promise<any[]> {
		const returnObjects = [];
		if (!collection || ids.length <= 0) {
			return returnObjects;
		}

		for (const id of ids) {
			try {
				const returnObject = await this.getById(collection, id);
				returnObjects.push(returnObject);
			} catch (e) {
				returnObjects.push({ id: id, error: e });
			}
		}

		return returnObjects;
	}

	public update(collection: string, id: string, data: any): Promise<any> {
		if (!collection || !id) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService
				.update(collection, id, data)
				.then((res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public updateWithOperation(
		collection: string,
		id: string,
		data: any,
		operation: string
	): Promise<any> {
		if (!collection || !id) {
			return Promise.reject(new BlApiNotFoundError());
		}

		return new Promise((resolve, reject) => {
			this._apiService
				.updateWithOperation(collection, id, data, operation)
				.then((res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public add(collection: string, data: any): Promise<any> {
		if (!collection) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService
				.add(collection, data)
				.then((res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	public remove(collection: string, id: string): Promise<any> {
		if (!collection || !id) {
			return Promise.reject(new BlApiNotFoundError());
		}
		return new Promise((resolve, reject) => {
			this._apiService
				.remove(collection, id)
				.then((res: ApiResponse) => {
					this.getDocIfValid(res)
						.then((doc: any) => {
							resolve(doc);
						})
						.catch((blApiErr: BlApiError) => {
							reject(blApiErr);
						});
				})
				.catch((blApiErr: BlApiError) => {
					reject(blApiErr);
				});
		});
	}

	private getDocIfValid(apiRes: ApiResponse): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getDocsIfValid(apiRes)
				.then((docs: any[]) => {
					if (docs.length !== 1) {
						return reject(
							new BlApiError(
								"there where more than one document in the response"
							)
						);
					}

					resolve(docs[0]);
				})
				.catch((err: BlApiError) => {
					reject(err);
				});
		});
	}

	private getDocsIfValid(apiRes: ApiResponse): Promise<any[]> {
		return new Promise((resolve, reject) => {
			try {
				const docs = this.validateAndGetDocs(apiRes);

				resolve(docs);
			} catch (err) {
				console.log("the response::", apiRes);
				reject(new BlApiError("document data not valid"));
			}
		});
	}

	private validateAndGetDocs(apiResponse: ApiResponse): any[] {
		if (!isArray(apiResponse.data)) {
			throw new Error("response data is not an array");
		}

		const docs: any[] = [];

		for (const d of apiResponse.data) {
			docs.push(this.validateAndGetDoc(d));
		}

		return docs;
	}

	private validateAndGetDoc(responseDocument: any) {
		if (!responseDocument.data || !responseDocument.data.id) {
			return responseDocument;
		}

		return responseDocument.data;
	}
}
