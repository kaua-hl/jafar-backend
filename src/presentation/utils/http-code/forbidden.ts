import { HttpResponse } from "../../models/http-response";

export const forbidden = (error: Error): HttpResponse => {
	return {
		statusCode: 403,
		body: error,
	};
};
