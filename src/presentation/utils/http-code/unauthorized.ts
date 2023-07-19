import { UnauthorizedError } from "../../errors/unauthorized-error";
import { httpStatusCode } from "../../models/http-code";
import { HttpResponse } from "../../models/http-response";

export const unauthorized = (): HttpResponse => {
	return {
		statusCode: httpStatusCode.unauthorized,
		body: new UnauthorizedError(),
	};
};
