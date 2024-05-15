import { Injectable } from "@angular/core";
import { BlApiError, EditableText } from "@boklisten/bl-model";
import { ApiService } from "../../api/api.service";
import { BL_CONFIG } from "../../bl-connect/bl-config";

@Injectable()
export class EditableTextService {
	public static readonly editableTextIds = BL_CONFIG.editableTextIds;

	constructor(private _apiService: ApiService) {}

	public async getEditableText(
		editableTextId: string
	): Promise<EditableText | null> {
		try {
			const response = await this._apiService.get(
				`${BL_CONFIG.collection.editableTexts}/${editableTextId}`
			);
			return response.data[0] as EditableText;
		} catch (blApiErr) {
			if ((blApiErr as BlApiError)?.code === 701) {
				return null;
			} else {
				console.error(`Failed to fetch EditableText`, blApiErr);
				return null;
			}
		}
	}
}
