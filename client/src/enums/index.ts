export enum EReduxActionTypesEvent {
	LOAD_EVENTS = "LOAD_EVENTS",
	ERROR_EVENTS = "ERROR_EVENTS",
	GET_EVENT_BY_ID = "GET_EVENT_BY_ID",
	GET_EVENTS = "GET_EVENTS",
	CREATE_EVENT = "CREATE_EVENT",
	UPDATE_EVENT = "UPDATE_EVENT",
	DELETE_EVENT = "DELETE_EVENT"
}

export enum EReduxActionTypesUser {
	LOAD_USERS = "LOAD_USERS",
	ERROR_USERS = "ERROR_USERS",
	GET_USER_BY_ID = "GET_USER_BY_ID",
	GET_USERS = "GET_USERS",
	REGISTER_USER = "REGISTER_USER",
	IS_USER_AUTHENTICATED = "IS_USER_AUTHENTICATED",
	LOG_OUT_USER = "LOG_OUT_USER",
	SIGNIN_USER = "SIGNIN_USER",
	UPDATE_USER = "UPDATE_USER",
	DELETE_USER = "DELETE_USER"
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
