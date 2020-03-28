import {
	OptionsWithUri,
 } from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	IDataObject
} from 'n8n-workflow';

export async function meetupApiRequest(this: IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, method: string, resource: string, body: any = {}, qs: IDataObject = {}, uri?: string, headers: IDataObject = {}, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any
	let options: OptionsWithUri = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		uri: uri || `https://api.meetup.com${resource}`,
		json: true
	};
	console.log(options);
	try {
		options = Object.assign({}, options, option);
		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}
		if (Object.keys(body).length === 0) {
			delete options.body;
		}
		//@ts-ignore
		return await this.helpers.requestOAuth.call(this, 'meetupOAuth2Api', options);
	} catch (error) {
		if (error.response && error.response.body && error.response.body.errors) {
			// Try to return the error prettier
			const errorMessages = error.response.body.errors.map((errorData: { message: string }) => {
				return errorData.message;
			});
			throw new Error(`Meetup error response [${error.statusCode}]: ${errorMessages.join(' | ')}`);
		}
		throw error;
	}
}

export async function meetupApiRequestAllItems(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body: any = {}, query: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];

	let responseData;
	let uri: string | undefined;
	query.page = 200;

	do {
		responseData = await meetupApiRequest.call(this, method, endpoint, body, query, uri, {}, { resolveWithFullResponse: true });
		if (responseData.headers.link && responseData.headers.link.include('next')) {
			uri = responseData.headers.link.split(';')[0].replace('<','').replace('>','');
		}
		returnData.push.apply(returnData, responseData.body);
	} while (
		responseData.headers.link !== undefined &&
		responseData.headers.link.include('next')
	);

	return returnData;
}
