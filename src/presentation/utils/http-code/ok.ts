import { httpStatusCode } from "../../models/http-code";
import { HttpResponse } from "../../models/http-response";

export const ok = (body: any): HttpResponse => {
	return {
		statusCode: httpStatusCode.ok,
		body,
	};
};
