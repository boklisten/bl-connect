export const BL_CONFIG = {
	devEnvironment: true,
	api: {
		dev: {
			protocol: 'https',
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
	token: {
		accessToken: 'bl-access-token',
		refreshToken: 'bl-refresh-token'
	},
	login: {
		local: {
			url: 'auth/local/login'
		},
		facebook: {
			url: 'auth/facebook'
		},
		google: {
			url: 'auth/google'
		}
	},
	register: {
		local: {
			url: 'auth/local/register'
		},
		facebook: {
			url: 'auth/facebook'
		},
		google: {
			url: 'auth/google'
		}
	},
	collection: {
		item: 'items',
		branch: 'branches',
		openingHour: 'openingHours',
		userDetail: 'userdetails',
		customerItem: 'customerItems',
		order: 'orders',
		orderItem: 'orderItems',
		payment: 'payments',
		delivery: 'deliveries'
	}
};

