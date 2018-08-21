import {TestBed, inject} from '@angular/core/testing';

import {PrintPdfService} from './print-pdf.service';

describe('PrintPdfService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PrintPdfService]
		});
	});

	it('should be created', inject([PrintPdfService], (service: PrintPdfService) => {
		expect(service).toBeTruthy();
	}));
});
