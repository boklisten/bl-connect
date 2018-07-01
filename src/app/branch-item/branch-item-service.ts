import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {BranchItem} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {CachedDocumentService} from "../document/cached-document.service";


@Injectable()
export  class BranchItemService {
	private _collection: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService) {
		this._collection = BL_CONFIG.collection.branchItem;
	}

	public get(query?: string): Promise<BranchItem[]> {
		return this._cachedDocumentService.get(query);
	}

	public getById(id: string): Promise<BranchItem> {
		return this._cachedDocumentService.getById(this._collection, id);
	}

	public getManyByIds(ids: string[]): Promise<BranchItem[]> {
		return this._cachedDocumentService.getManyByIds(this._collection, ids);
	}

	public update(id: string, data: any): Promise<BranchItem> {
		return this._cachedDocumentService.update(this._collection, id, data);
	}

	public add(branchItem: BranchItem): Promise<BranchItem> {
		return this._cachedDocumentService.add(this._collection, branchItem);
	}
}


