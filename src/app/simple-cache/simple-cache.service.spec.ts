import {TestBed, inject} from '@angular/core/testing';

import {SimpleCache} from './simple-cache.service';

describe('SimpleCacheService', () => {
	let service: SimpleCache<any>;


	beforeEach(() => {
		service = new SimpleCache();
		service.refreshTimeMs = 500;
	});

	afterEach(() => {
		service.clear();
	});


	describe('#add', () => {
		const document = {id: 'abc', name: 'xyz'};

		it('should add document with the id as a hash', () => {
			service.add(document);
			expect(service.get(document.id)).toEqual(document);
		});
	});

	describe('#get', () => {

		it('should get the document if id is in cache', () => {
			const document = {id: 'abc', title: 'kwt'};
			service.add(document);
			expect(service.get(document.id)).toEqual(document);
		});

		it('should return undefined if document is not found in cache', () => {
			expect(service.get('aRandomId')).toBeUndefined();
		});

		it('should return undefined if the object is in store, but the cache time is overdue', () => {
			service.refreshTimeMs = 1;
			const document = {id: '123', bananas: ['1', '2']};
			service.add(document);

			setTimeout(() => {
				expect(service.get(document.id)).toBeUndefined();
			}, 2);
		});
	});



});
