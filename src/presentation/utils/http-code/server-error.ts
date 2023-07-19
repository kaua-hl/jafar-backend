import { ServerError } from "../../errors/server-error";
import { httpStatusCode } from "../../models/http-code";
import { HttpResponse } from "../../models/http-response";

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: httpStatusCode.serverError,
		body: new ServerError(error.stack),
	};
};
