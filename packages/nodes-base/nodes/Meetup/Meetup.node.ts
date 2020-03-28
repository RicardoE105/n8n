import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeTypeDescription,
	INodeType,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import {
	meetupApiRequest,
	meetupApiRequestAllItems,
} from './GenericFunctions';

import {
	eventOperations,
	eventFields,
} from './EventDescription';

import {
	IEvent,
} from './EventInterface';

import {
	snakeCase,
 } from 'change-case';

export class Meetup implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Meetup',
		name: ' meetup',
		icon: 'file:meetup.png',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Meetup API.',
		defaults: {
			name: 'Meetup',
			color: '#da3846',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'meetupOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Event',
						value: 'event',
					},
				],
				default: 'event',
				description: 'The resource to operate on.',
			},
			...eventOperations,
			...eventFields,
		],
	};

	methods = {
		loadOptions: {
			// Get all the groups to display them to user so that he can
			// select them easily
			async getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const response = await meetupApiRequest.call(this, 'GET', '/self/groups');
				const groups = Object.values(response) as IDataObject[];
				for (const group of groups) {
					const groupName = group.name;
					const groupId = group.urlname;
					returnData.push({
						name: groupName as string,
						value: groupId as string,
					});
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length as unknown as number;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < length; i++) {
			if (resource === 'event') {
				//https://www.meetup.com/meetup_api/docs/:urlname/events/#create
				if (operation === 'create') {
					const groupId = this.getNodeParameter('groupId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const fee = (this.getNodeParameter('feeUi', i) as IDataObject).feeValues as IDataObject;
					const location = (this.getNodeParameter('locationUi', i) as IDataObject).locationValues as IDataObject;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IEvent = {
						name,
					};
					if (additionalFields.announce) {
						body.announce = additionalFields.announce as boolean;
					}
					if (additionalFields.description) {
						body.description = additionalFields.description as string;
					}
					if (additionalFields.duration) {
						body.duration = (additionalFields.duration as number) * 60000;
					}
					if (additionalFields.eventHosts) {
						body.event_hosts = additionalFields.eventHosts as string;
					}
					if (additionalFields.photoId) {
						body.featured_photo_id = additionalFields.photoId as number;
					}
					if (additionalFields.guestLimit) {
						body.guest_limit = additionalFields.guestLimit as number;
					}
					if (additionalFields.howToFindUs) {
						body.how_to_find_us = additionalFields.howToFindUs as string;
					}
					if (additionalFields.publishStatus) {
						body.publish_status = additionalFields.publishStatus as string;
					}
					if (additionalFields.question) {
						body.question = additionalFields.question as string;
					}
					if (additionalFields.rsvpCloseTime) {
						body.rsvp_close_time = new Date(additionalFields.rsvpCloseTime as string).getTime();
					}
					if (additionalFields.rsvpLimit) {
						body.rsvp_limit = additionalFields.rsvpLimit as number;
					}
					if (additionalFields.rsvpOpenTime) {
						body.rsvp_open_time = new Date(additionalFields.rsvpOpenTime as string).getTime();
					}
					if (additionalFields.selfRsvp) {
						body.self_rsvp = additionalFields.self_rsvp as boolean;
					}
					if (additionalFields.time) {
						body.time = new Date(additionalFields.time as string).getTime();
					}
					if (additionalFields.venueId) {
						body.venue_id = additionalFields.venueId as number;
					}
					if (additionalFields.venueVisibility) {
						body.venue_visibility = additionalFields.venueVisibility as string;
					}
					if (fee) {
						body.fee = {
							accepts: fee.accepts,
							amount: fee.amount,
							currency: fee.currency,
							refund_policy: fee.refund_policy,
						};
					}
					if (location) {
						body.lat = location.lat as number;
						body.lon = location.lon as number;
					}
					responseData = await meetupApiRequest.call(this, 'POST', `/${groupId}/events`, body, qs);
				}
				//https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#delete
				if (operation === 'delete') {
					const groupId = this.getNodeParameter('groupId', i) as string;
					const eventId = this.getNodeParameter('eventId', i) as string;
					const options = this.getNodeParameter('options', i) as IDataObject;
					if (options.updateSeries) {
						qs.update_series = options.updateSeries as boolean;
					}
					if (options.removeFromCalendar) {
						qs.remove_from_calendar = options.removeFromCalendar as boolean;
					}
					responseData = await meetupApiRequest.call(this, 'DELETE', `/${groupId}/events/${eventId}`, {}, qs);
					responseData = { success: true  };
				}
				//https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get
				if (operation === 'get') {
					const groupId = this.getNodeParameter('groupId', i) as string;
					const eventId = this.getNodeParameter('eventId', i) as string;
					const options = this.getNodeParameter('options', i) as IDataObject;
					if (options.fields) {
						qs.only = options.fields as string;
					}
					responseData = await meetupApiRequest.call(this, 'GET', `/${groupId}/events/${eventId}`, {}, qs);
				}
				//https://developers.google.com/calendar/v3/reference/events/list
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const groupId = this.getNodeParameter('groupId', i) as string;
					const options = this.getNodeParameter('options', i) as IDataObject;
					if (options.desc) {
						qs.desc = options.desc as boolean;
					}
					if (options.fields) {
						qs.only = options.fields as string;
					}
					if (options.hasEnded) {
						qs.has_ended = options.hasEnded as boolean;
					}
					if (options.noEarlierThan) {
						qs.no_earlier_than = options.noEarlierThan as string;
					}
					if (options.noLaterThan) {
						qs.no_later_than = options.noLaterThan as string;
					}
					if (options.scroll) {
						qs.scroll = snakeCase(options.scroll as string);
					}
					if (options.status) {
						qs.status = options.status as string;
					}
					if (returnAll) {
						responseData = await meetupApiRequestAllItems.call(this, 'GET', `/${groupId}/events`, {}, qs);
					} else {
						qs.page = this.getNodeParameter('limit', i) as number;
						responseData = await meetupApiRequest.call(this, 'GET', `/${groupId}/events`, {}, qs);
					}
				}
				//https://www.meetup.com/meetup_api/docs/:urlname/events/:id/attendance/#list
				if (operation === 'getAttendance') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const groupId = this.getNodeParameter('groupId', i) as string;
					const eventId = this.getNodeParameter('eventId', i) as string;
					const options = this.getNodeParameter('options', i) as IDataObject;
					if (options.desc) {
						qs.desc = options.desc as boolean;
					}
					if (options.order) {
						qs.order = options.order as string;
					}
					if (returnAll) {
						responseData = await meetupApiRequestAllItems.call(this, 'GET', `/${groupId}/events/${eventId}/attendance`, {}, qs);
					} else {
						qs.page = this.getNodeParameter('limit', i) as number;
						responseData = await meetupApiRequest.call(this, 'GET', `/${groupId}/events/${eventId}/attendance`, { page: 1 }, qs);
					}
				}
				//https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#edit
				if (operation === 'update') {
					const groupId = this.getNodeParameter('groupId', i) as string;
					const eventId = this.getNodeParameter('eventId', i) as string;
					const location = (this.getNodeParameter('locationUi', i) as IDataObject).locationValues as IDataObject;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const body: IEvent = {};
					if (updateFields.name) {
						body.name = updateFields.name as string;
					}
					if (updateFields.announce) {
						body.announce = updateFields.announce as boolean;
					}
					if (updateFields.description) {
						body.description = updateFields.description as string;
					}
					if (updateFields.duration) {
						body.duration = (updateFields.duration as number) * 60000;
					}
					if (updateFields.eventHosts) {
						body.event_hosts = updateFields.eventHosts as string;
					}
					if (updateFields.photoId) {
						body.featured_photo_id = updateFields.photoId as number;
					}
					if (updateFields.guestLimit) {
						body.guest_limit = updateFields.guestLimit as number;
					}
					if (updateFields.howToFindUs) {
						body.how_to_find_us = updateFields.howToFindUs as string;
					}
					if (updateFields.publishStatus) {
						body.publish_status = updateFields.publishStatus as string;
					}
					if (updateFields.question) {
						body.question = updateFields.question as string;
					}
					if (updateFields.rsvpCloseTime) {
						body.rsvp_close_time = new Date(updateFields.rsvpCloseTime as string).getTime();
					}
					if (updateFields.rsvpLimit) {
						body.rsvp_limit = updateFields.rsvpLimit as number;
					}
					if (updateFields.rsvpOpenTime) {
						body.rsvp_open_time = new Date(updateFields.rsvpOpenTime as string).getTime();
					}
					if (updateFields.venueId) {
						body.venue_id = updateFields.venueId as number;
					}
					if (updateFields.venueVisibility) {
						body.venue_visibility = updateFields.venueVisibility as string;
					}
					if (location) {
						body.lat = location.lat as number;
						body.lon = location.lon as number;
					}
					responseData = await meetupApiRequest.call(this, 'PATCH', `/${groupId}/events/${eventId}`, body, qs);
				}
			}
		}
		if (Array.isArray(responseData)) {
			returnData.push.apply(returnData, responseData as IDataObject[]);
		} else if (responseData !== undefined) {
			returnData.push(responseData as IDataObject);
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
