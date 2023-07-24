import { UnauthorizedError } from "../../errors/unauthorized-error";
import { HttpResponse } from "../../models/http-response";

export const unauthorized = (): HttpResponse => {
	return {
		statusCode: 401,
		body: new UnauthorizedError(),
	};
};
