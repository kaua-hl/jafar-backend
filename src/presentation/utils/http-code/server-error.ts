import { ServerError } from "../../errors/server-error";
import { HttpResponse } from "../../models/http-response";

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: 500,
		body: new ServerError(error.stack),
	};
};
