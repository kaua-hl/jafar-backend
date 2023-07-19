import { httpStatusCode } from "../../models/http-code";
import { HttpResponse } from "../../models/http-response";

export const forbidden = (error: Error): HttpResponse => {
	return {
		statusCode: httpStatusCode.forbidden,
		body: error,
	};
};
