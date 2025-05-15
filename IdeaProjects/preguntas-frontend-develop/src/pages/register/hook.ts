import { UserRegisterRequest } from '../../models/users.models';
import { RegisterUserForm } from './types';
import { registerUser } from '../../services/auth.service';
import { useApiHandler } from '../../hooks/useApiHandlers';
import { useNotificationHandler } from '../../hooks/notificationHandler';

export const useDependencies = () => {
	const { handleMutation } = useApiHandler();
	const { setErrorNotification, setInfoNotification } = useNotificationHandler();

	const validatePassword = (value: string) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&.])[A-Za-z\d@$!%.?&]{8,}$/;
		if (!value || passwordRegex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(
			new Error(
				'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
			)
		);
	};
	//Se agrega función para POST en users
	const handleSubmit = async (parms: RegisterUserForm) => {

		const request: UserRegisterRequest = {
			username: parms.username, // Nombre de usuario
			email: parms.email, // TEXT
			password: parms.password, // Contraseña
		};

		const { isError, message } = await handleMutation(registerUser, request);

		if (isError) {
			setErrorNotification(message);
		} else {
			setInfoNotification(message);
		}
	};

	return { handleSubmit, validatePassword };
};
