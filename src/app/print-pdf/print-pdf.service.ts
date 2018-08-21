import {Injectable} from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
	providedIn: 'root'
})
export class PrintPdfService {

	constructor() {
	}

	public printPdf(encodedPdfContent: string, filename: string) {
		const byteCharacters = atob(encodedPdfContent);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteNumbers.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}

		const blob = new Blob([new Uint8Array(byteNumbers)], {type: 'application/pdf;charset=utf-8'})
		saveAs(blob, filename);
	}
}
