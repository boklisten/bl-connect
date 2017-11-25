import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {OpeningHour} from "bl-model";
import {ApiErrorResponse} from "../api/api-error-response";
import {ApiResponse} from "../api/api-response";
import {BL_CONFIG} from "../bl-connect/bl-config";

@Injectable()
export class OpeningHourService {
	private collectionName: string;
	
	constructor(private apiService: ApiService) {
		this.collectionName = BL_CONFIG.collection.openingHour;
	}
	
	public getById(id: string): Promise<OpeningHour> {
		return new Promise((resolve, reject) => {
			this.apiService.getById(this.collectionName, id).then(
				(res: ApiResponse) => {
					if (res.data && res.data.length === 1) {
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

