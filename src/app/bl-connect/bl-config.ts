export const BL_CONFIG = {
	devEnvironment: true,
	api: {
		dev: {
			protocol: 'http',
			basePath: 'localhost',
			port: 1337,
			path: 'api',
			version: 'v1'
		},
		prod: {
			protocol: '',
			basePath: '',
			port: 80,
			path: 'api',
			version: 'v1'
		}
	},
	collection: {
		item: 'items',
		branch: 'branches',
		openingHour: 'openingHours'
	}
};
