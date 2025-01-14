export const BL_CONFIG = {
	api: {
		basePath: "http://localhost:1337/",
	},
	token: {
		accessToken: "bl-access-token",
		refreshToken: "bl-refresh-token",
	},
	login: {
		local: {
			url: "auth/local/login",
		},
		facebook: {
			url: "auth/facebook",
		},
		google: {
			url: "auth/google",
		},
		feide: {
			url: "auth/feide",
		},
	},
	register: {
		local: {
			url: "auth/local/register",
		},
		facebook: {
			url: "auth/facebook",
		},
		google: {
			url: "auth/google",
		},
		feide: {
			url: "auth/feide",
		},
	},
	order: {
		receipt: {
			operation: "receipt",
		},
		agreement: {
			operation: "agreement",
		},
	},
	pendingPasswordReset: {
		confirm: {
			operation: "confirm",
		},
	},
	emailValidation: {
		confirm: {
			operation: "confirm",
		},
	},
	collection: {
		item: "items",
		branch: "branches",
		branchItem: "branchitems",
		openingHour: "openingHours",
		userDetail: "userdetails",
		customerItem: "customerItems",
		order: "orders",
		orderItem: "orderItems",
		payment: "payments",
		delivery: "deliveries",
		pendingPasswordReset: "pendingpasswordresets",
		company: "companies",
		emailValidation: "email_validations",
		message: "messages",
		invoice: "invoices",
		userMatches: "user_matches",
		standMatches: "stand_matches",
		booking: "bookings",
		uniqueItem: "uniqueitems",
		editableTexts: "editabletexts",
		signature: "signatures",
	},
	editableTextIds: {
		newsBanner: "65a7f68e81488330ddcd6fd3",
	},
};
