import {TestBed, inject} from '@angular/core/testing';

import {OpeningHourService} from './opening-hour.service';

describe('OpeningHourService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OpeningHourService]
		});
	});
	
	it('should be created', inject([OpeningHourService], (service: OpeningHourService) => {
		expect(service).toBeTruthy();
	}));
});
