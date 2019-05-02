import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BlApiError, Message, TextBlock, CustomerItemType } from '@wizardcoder/bl-model';
import { BL_CONFIG } from "../bl-connect/bl-config";
import { TokenService } from "../token/token.service";
import { DocumentService } from '../document/document.service';

@Injectable()
export class MessageService {
  private _collection: string;

  constructor(private _apiService: ApiService, private _tokenService: TokenService, private _documentService: DocumentService) {
    this._collection = BL_CONFIG.collection.message;
  }

  public sendReminder(customerId: string, deadline: Date, type: CustomerItemType | 'all', textBlocks?: TextBlock[]): Promise<Message> {
    const message: Message = {
      id: '',
      messageType: 'reminder',
      messageSubtype: type as any,
      messageMethod: 'all',
      customerId: customerId,
      info: {
        deadline: deadline
      },
      textBlocks: (textBlocks && textBlocks.length > 0) ? textBlocks : []
    };

    return this._documentService.add(this._collection, message);
  }
}
