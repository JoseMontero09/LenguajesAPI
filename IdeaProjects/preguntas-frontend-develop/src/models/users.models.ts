export interface UserRegisterRequest {
	username: string; // TEXT
	email: string; //TEXT
	password: string; // TEXT
}

export type AuthenticationResponse = {
	token: string;
};

export type AuthenticationInput = {
	username: string;
	password: string;
};
