import {TestBed, inject} from '@angular/core/testing';

import {OrderPdfService} from './order-pdf.service';

describe('OrderReceiptPdfService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OrderPdfService]
		});
	});

	it('should be created', inject([OrderPdfService], (service: OrderPdfService) => {
		expect(service).toBeTruthy();
	}));
});
