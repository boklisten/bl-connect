import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ApiResponse} from "../api/api-response";
import {ApiErrorResponse} from "../api/api-error-response";
import {Item} from "bl-model";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class ItemService {
	collectionName: string;
	
	constructor(private apiService: ApiService) {
		this.collectionName = BL_CONFIG.collection.item;
	}
	
	public get(query?: string): Promise<Item[]> {
		return new Promise((resolve, reject) => {
			this.apiService.get(this.collectionName, query).then(
				(res: ApiResponse) => {
					const items: Item[] = [];
					for (const data of res.data) {
						items.push(data.data);
					}
					resolve(items);
				},
				(error: ApiErrorResponse) => {
					reject(error);
				});
		});
	}
	
	public getById(id: string): Promise<Item> {
		return new Promise((resolve, reject) => {
			this.apiService.getById(this.collectionName, id).then(
				(res: ApiResponse) => {
					if (res.data.length === 1) {
						resolve(res.data[0].data);
					} else {
						reject(new ApiErrorResponse('bad data', 500));
					}
				},
				(error: ApiErrorResponse) => {
					reject(error);
				});
		});
	}
}

