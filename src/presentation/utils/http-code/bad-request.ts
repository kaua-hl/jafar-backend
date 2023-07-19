import { httpStatusCode } from "../../models/http-code";
import { HttpResponse } from "../../models/http-response";

export const badRequest = (error: Error): HttpResponse => {
	return {
		statusCode: httpStatusCode.badRequest,
		body: error,
	};
};
