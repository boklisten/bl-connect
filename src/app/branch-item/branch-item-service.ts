import {Injectable} from "@angular/core";
import {DocumentService} from "../document/document.service";
import {BranchItem} from "@wizardcoder/bl-model";
import {ApiService} from "../api/api.service";
import {BL_CONFIG} from "../bl-connect/bl-config";


@Injectable()
export  class BranchItemService {
	private _collectionName: string;
	private _documentName: string;
	private _documentService: DocumentService<BranchItem>;

	constructor(private _apiService: ApiService) {
		this._collectionName = BL_CONFIG.collection.branchItem;
		this._documentService = new DocumentService<BranchItem>(this._collectionName, this._apiService);
	}

	public get(query?: string): Promise<BranchItem[]> {
		return this._documentService.get(query);
	}

	public getById(id: string): Promise<BranchItem> {
		return this._documentService.getById(id);
	}

	public getManyByIds(ids: string[]): Promise<BranchItem[]> {
		return this._documentService.getManyByIds(ids);
	}

	public update(id: string, data: any): Promise<BranchItem> {
		return this._documentService.update(id, data);
	}

	public add(branchItem: BranchItem): Promise<BranchItem> {
		return this._documentService.add(branchItem);
	}
}


