// Type no tiene mucha diferencia con las interfaces. En este caso se puede usar cualquiera.
export type ErrorResponse = {
	message: string;
	code: number;
};

export type OkResponse = {
	status: string;
};

export type Response = {
	result: string;
};
