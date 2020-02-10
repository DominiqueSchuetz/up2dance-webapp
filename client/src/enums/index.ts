export enum EReduxActionTypesAuthUser {
	IS_USER_AUTHENTICATED = "IS_USER_AUTHENTICATED",
	IS_USER_AUTHENTICATED_STARTED = "IS_USER_AUTHENTICATED_STARTED",
	IS_USER_AUTHENTICATED_SUCCEEDED = "IS_USER_AUTHENTICATED_SUCCEEDED",
	IS_USER_AUTHENTICATED_FAILED = "IS_USER_AUTHENTICATED_FAILED",
	IS_USER_AUTHENTICATED_ERROR = "IS_USER_AUTHENTICATED_ERROR",

	SIGN_IN_USER = "SIGN_IN_USER",
	SIGN_IN_USER_STARTED = "SIGN_IN_USER_STARTED",
	SIGN_IN_USER_SUCCEEDED = "SIGN_IN_USER_SUCCEEDED",
	SIGN_IN_USER_FAILED = "SIGN_IN_USER_FAILED",
	SIGN_IN_USER_ERROR = "SIGN_IN_USER_ERROR",
	SIGN_IN_USER_ENDED = "SIGN_IN_USER_ENDED",

	SIGN_OUT_USER = "SIGN_OUT_USER",
	SIGN_OUT_USER_STARTED = "SIGN_OUT_USER_STARTED",
	SIGN_OUT_USER_SUCCEEDED = "SIGN_OUT_USER_SUCCEEDED",
	SIGN_OUT_USER_FAILED = "SIGN_OUT_USER_FAILED",
	SIGN_OUT_USER_ERROR = "SIGN_OUT_USER_ERROR",
	SIGN_OUT_USER_ENDED = "SIGN_OUT_USER_ENDED",

	UPDATE_AUTH_USER_SUCCEEDED = "UPDATE_AUTH_USER_SUCCEEDED",
	UPDATE_AUTH_USER_FAILED = "UPDATE_AUTH_USER_FAILED",
	UPDATE_AUTH_USER_ERROR = "UPDATE_AUTH_USER_ERROR"
}

export enum EReduxActionTypesEvent {
	LIST_EVENTS = "LIST_EVENTS",
	LIST_EVENTS_STARTED = "LIST_EVENTS_STARTED",
	LIST_EVENTS_SUCCEEDED = "LIST_EVENTS_SUCCEEDED",
	LIST_EVENTS_FAILED = "LIST_EVENTS_FAILED",
	LIST_EVENTS_ERROR = "LIST_EVENTS_ERROR",
	LIST_EVENTS_ENDED = "LIST_EVENTS_ENDED",

	ADD_EVENT_STARTED = "ADD_EVENT_STARTED",
	ADD_EVENT = "ADD_EVENT",
	ADD_EVENT_SUCCEEDED = "ADD_EVENT_SUCCEEDED",
	ADD_EVENT_FAILED = "ADD_EVENT_FAILED",
	ADD_EVENT_ERROR = "ADD_EVENT_ERROR",
	ADD_EVENT_ENDED = "ADD_EVENT_ENDED",

	UPDATE_EVENT = "UPDATE_EVENT",
	UPDATE_EVENT_STARTED = "UPDATE_EVENT_STARTED",
	UPDATE_EVENT_SUCCEEDED = "UPDATE_EVENT_SUCCEEDED",
	UPDATE_EVENT_FAILED = "UPDATE_EVENT_FAILED",
	UPDATE_EVENT_ERROR = "UPDATE_EVENT_ERROR",
	UPDATE_EVENT_ENDED = "UPDATE_EVENT_ENDED",

	REMOVE_EVENT = "REMOVE_EVENT",
	REMOVE_EVENT_STARTED = "REMOVE_EVENT_STARTED",
	REMOVE_EVENT_SUCCEEDED = "REMOVE_EVENT_SUCCEEDED",
	REMOVE_EVENT_FAILED = "REMOVE_EVENT_FAILED",
	REMOVE_EVENT_ERROR = "REMOVE_EVENT_ERROR",
	REMOVE_EVENT_ENDED = "REMOVE_EVENT_ENDED"
}

export enum EReduxActionTypesUser {
	LIST_USERS = "LIST_USERS",
	LIST_USERS_STARTED = "LIST_USERS_STARTED",
	LIST_USERS_SUCCEEDED = "LIST_USERS_SUCCEEDED",
	LIST_USERS_FAILED = "LIST_USERS_FAILED",
	LIST_USERS_ERROR = "LIST_USERS_ERROR",
	LIST_USERS_ENDED = "LIST_USERS_ENDED",

	ADD_USER_STARTED = "ADD_USER_STARTED",
	ADD_USER = "ADD_USER",
	ADD_USER_SUCCEEDED = "ADD_USER_SUCCEEDED",
	ADD_USER_FAILED = "ADD_USER_FAILED",
	ADD_USER_ERROR = "ADD_USER_ERROR",
	ADD_USER_ENDED = "ADD_USER_ENDED",

	UPDATE_USER = "UPDATE_USER",
	UPDATE_USER_STARTED = "UPDATE_USER_STARTED",
	UPDATE_USER_SUCCEEDED = "UPDATE_USER_SUCCEEDED",
	UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
	UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
	UPDATE_USER_ENDED = "UPDATE_USER_ENDED",

	REMOVE_USER = "REMOVE_USER",
	REMOVE_USER_STARTED = "REMOVE_USER_STARTED",
	REMOVE_USER_SUCCEEDED = "REMOVE_USER_SUCCEEDED",
	REMOVE_USER_FAILED = "REMOVE_USER_FAILED",
	REMOVE_USER_ERROR = "REMOVE_USER_ERROR",
	REMOVE_USER_ENDED = "REMOVE_USER_ENDED",

	REGISTER_USER = "REGISTER_USER",
	REGISTER_USER_STARTED = "REGISTER_USER_STARTED",
	REGISTER_USER_SUCCEEDED = "REGISTER_USER_SUCCEEDED",
	REGISTER_USER_FAILED = "REGISTER_USER_FAILED",
	REGISTER_USER_ERROR = "REGISTER_USER_ERROR",
	REGISTER_USER_ENDED = "REGISTER_USER_ENDED"
}

export enum EReduxActionTypesMedia {
	LIST_MEDIA = "LIST_MEDIA",
	LIST_MEDIA_STARTED = "LIST_MEDIA_STARTED",
	LIST_MEDIA_SUCCEEDED = "LIST_MEDIA_SUCCEEDED",
	LIST_MEDIA_FAILED = "LIST_MEDIA_FAILED",
	LIST_MEDIA_ERROR = "LIST_MEDIA_ERROR",
	LIST_MEDIA_ENDED = "LIST_MEDIA_ENDED",

	ADD_MEDIA_STARTED = "ADD_MEDIA_STARTED",
	ADD_MEDIA = "ADD_MEDIA",
	ADD_MEDIA_SUCCEEDED = "ADD_MEDIA_SUCCEEDED",
	ADD_MEDIA_FAILED = "ADD_MEDIA_FAILED",
	ADD_MEDIA_ERROR = "ADD_MEDIA_ERROR",
	ADD_MEDIA_ENDED = "ADD_MEDIA_ENDED",

	UPDATE_MEDIA = "UPDATE_MEDIA",
	UPDATE_MEDIA_STARTED = "UPDATE_MEDIA_STARTED",
	UPDATE_MEDIA_SUCCEEDED = "UPDATE_MEDIA_SUCCEEDED",
	UPDATE_MEDIA_FAILED = "UPDATE_MEDIA_FAILED",
	UPDATE_MEDIA_ERROR = "UPDATE_MEDIA_ERROR",
	UPDATE_MEDIA_ENDED = "UPDATE_MEDIA_ENDED",

	REMOVE_MEDIA = "REMOVE_MEDIA",
	REMOVE_MEDIA_STARTED = "REMOVE_MEDIA_STARTED",
	REMOVE_MEDIA_SUCCEEDED = "REMOVE_MEDIA_SUCCEEDED",
	REMOVE_MEDIA_FAILED = "REMOVE_MEDIA_FAILED",
	REMOVE_MEDIA_ERROR = "REMOVE_MEDIA_ERROR",
	REMOVE_MEDIA_ENDED = "REMOVE_MEDIA_ENDED"
}

export enum EReduxActionTypesCustomer {
	LOAD_CUSTOMERS = "LOAD_CUSTOMERS",
	ERROR_CUSTOMERS = "ERROR_CUSTOMERS",
	CREATE_CUSTOMER = "CREATE_CUSTOMER"
}

export enum EBandMemberInstrumentSymbol {
	VOCAL = "🎤",
	VOCAL_AND_GUITAR = "🎤+ 🎸",
	KEYS = "🎹",
	GUITAR_LEAD = "🎸",
	GUITAR_SOLO = "🎸",
	BASS_GUITAR = "🎸",
	DRUMS = "🥁"
}

export enum EBandMemberInstrument {
	VOCAL = "Gesang",
	VOCAL_AND_GUITAR = "Gesang/Gitarre",
	KEYS = "Keyboard/Synths",
	GUITAR_LEAD = "Gitarre(Lead)",
	GUITAR_SOLO = "Gitarre(Solo)",
	BASS_GUITAR = "Bass",
	DRUMS = "Schlagzeug"
}

export enum EKindOfEventAction {
	NEW_EVENT,
	UPDATE_EVENT,
	CUSTOMER_EVENT
}
