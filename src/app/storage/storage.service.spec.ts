import { StorageService } from "./storage.service";

describe("StorageService", () => {
	let service: StorageService;

	beforeEach(() => {
		service = new StorageService();
		service.removeAll();
	});

	describe("#add", () => {
		it("should return true and store the correct value when key and value are valid", () => {
			const key = "theKey";
			const val = "theVal";
			expect(service.add(key, val)).toBeTruthy();
			expect(service.get(key)).toEqual(val);
		});

		it("should store the value with a cookie if localStorage is not supported", () => {
			const key = "theKey";
			const val = "theVal";

			expect(service.add(key, val)).toBeTruthy();
		});
	});

	describe("#get", () => {
		it("should return the correct value", () => {
			const key = "theKey";
			const val = "theVal";

			expect(service.add(key, val)).toBeTruthy();
			expect(service.get(key)).toEqual(val);
		});

		it("should throw error when the key is not found", () => {
			const key = "notFound";

			expect(() => {
				service.get(key);
			}).toThrowError(/could not find stored object/);
		});
	});

	describe("#remove", () => {
		it("should remove the given key", () => {
			const key = "superDuperKey";
			const val = "theVal";

			service.add(key, val);
			service.remove(key);
			expect(() => {
				service.get(key);
			}).toThrowError(/could not find stored object/);
		});
	});

	describe("#removeAll", () => {
		it("should remove all the keys in store", () => {
			service.add("superKey", "superVal");
			service.add("kill", "me");
			service.add("some", "value");

			service.removeAll();

			expect(() => {
				service.get("superKey");
			}).toThrowError(/could not find/);

			expect(() => {
				service.get("kill");
			}).toThrowError(/could not find/);

			expect(() => {
				service.get("some");
			}).toThrowError(/could not find/);
		});
	});
});
