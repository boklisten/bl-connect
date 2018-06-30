import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {BranchItem} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";
import {CachedDocumentService} from "../document/cached-document.service";


@Injectable()
export  class BranchItemService {
	private _collectionName: string;
	private _documentName: string;

	constructor(private _apiService: ApiService, private _cachedDocumentService: CachedDocumentService<BranchItem>) {
		this._collectionName = BL_CONFIG.collection.branchItem;
		_cachedDocumentService._documentService = new DocumentService<BranchItem>(this._collectionName, this._apiService);
	}

	public get(query?: string): Promise<BranchItem[]> {
		return this._cachedDocumentService.get(query);
	}

	public getById(id: string): Promise<BranchItem> {
		return this._cachedDocumentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<BranchItem[]> {
		return this._cachedDocumentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<BranchItem> {
		return this._cachedDocumentService.update(id, data);
	}

	public add(branchItem: BranchItem): Promise<BranchItem> {
		return this._cachedDocumentService.add(branchItem);
	}
}


