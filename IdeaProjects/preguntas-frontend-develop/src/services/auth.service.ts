import {
	AuthenticationInput,
	AuthenticationResponse,
} from '../models/users.models';
import { doPost } from './http.service';
import { UserRegisterRequest } from '../models/users.models';


export const registerUser = async (
	user: UserRegisterRequest
	//Promise ya viene de react, es de tipo Response que ya viene predefinida, no inventamos el agua tibia
): Promise<Response> => {
	const response = await doPost<UserRegisterRequest, Response>(user, '/user');

	return response;
};

export const login = async (
	user: AuthenticationInput
): Promise<AuthenticationResponse> => {
	const result = await doPost<AuthenticationInput, AuthenticationResponse>(
		user,
		'/user'
	);
	return result;
};
