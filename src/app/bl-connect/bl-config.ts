export const BL_CONFIG = {
	api: {
		basePath: 'http://localhost:1337/api/v1/',
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
		branchItem: 'branchitems',
		openingHour: 'openingHours',
		userDetail: 'userdetails',
		customerItem: 'customerItems',
		order: 'orders',
		orderItem: 'orderItems',
		payment: 'payments',
		delivery: 'deliveries'
	}
};

