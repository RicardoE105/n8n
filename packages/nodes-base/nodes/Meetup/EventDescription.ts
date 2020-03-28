import {
	INodeProperties,
 } from "n8n-workflow";

export const eventOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new Meetup group event',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an event',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an event',
			},
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve all events on a group',
			},
			{
				name: 'Get Attendance',
				value: 'getAttendance',
				description: 'Retrieve all attendance for Meetup events',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an event',
			},
		],
		default: 'create',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const eventFields = [

/* -------------------------------------------------------------------------- */
/*                                 event:create                               */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
		description: 'The name of the event.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Announce',
				name: 'announce',
				type: 'boolean',
				default: false,
				description: 'Whether or not Meetup should announce this event to group members',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'The description of the event, in simple HTML format',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 180,
				description: 'Representing event duration in minutes',
			},
			{
				displayName: 'Event Hosts',
				name: 'eventHosts',
				type: 'string',
				default: '',
				description: `Containing up to 5 comma-separated valid member ids for members</br>
				who will be hosts of the event. This defaults to the authenticated member when</br>
				self_rsvp is true or undefined`,
			},
			{
				displayName: 'Featured Photo ID',
				name: 'photoId',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: ' Identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set.',
			},
			{
				displayName: 'Guest Limit',
				name: 'guestLimit',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: '',
				description: 'Representing the number of guests that members may include in their RSVP, 0 inclusive',
			},
			{
				displayName: 'How To Find Us',
				name: 'howToFindUs',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'The description for the location of the host(s) at the event venue.',
			},
			{
				displayName: 'Publish Status',
				name: 'publishStatus',
				type: 'options',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
				],
				default: 'published',
				description: 'Whether an event will be published to the group or as a draft visible only to the leadership team.',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				description: 'The RSVP survey question for the event',
			},
			{
				displayName: 'RSVP Close Time',
				name: 'rsvpCloseTime',
				type: 'dateTime',
				default: '',
				description: 'The time before which members will be allowed to RSVP to the event',
			},
			{
				displayName: 'RSVP Limit',
				name: 'rsvpLimit',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Total number of RSVP slots available for the event. When defined as 0, there will be no set limit.',
			},
			{
				displayName: 'RSVP Open Time',
				name: 'rsvpOpenTime',
				type: 'dateTime',
				default: '',
				description: `The time after which members will be allowed to RSVP to the event.</br>
				This can only be set if there is a start time for the event.</br>
				This defaults to no RSVP open time restriction.`,
			},
			{
				displayName: 'Self RSVP',
				name: 'selfRsvp',
				type: 'boolean',
				default: true,
				description: `whether the authenticated member will be RSVP'd to the event upon creation.`,
			},
			{
				displayName: 'Event Time',
				name: 'time',
				type: 'dateTime',
				default: '',
				description: 'Event start time',
			},
			{
				displayName: 'Venue ID',
				name: 'venueId',
				type: 'number',
				default: 0,
				description: 'Identifier for a venue.',
			},
			{
				displayName: 'Venue Visibility',
				name: 'venueVisibility',
				type: 'options',
				options: [
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Members',
						value: 'members',
					},
				],
				default: 0,
				description: 'Whether the event venue and host location description will be visible to non-members of the hosting group',
			},
		],
	},
	{
		displayName: 'Fee',
		name: 'feeUi',
		type: 'fixedCollection',
		default: '',
		placeholder: 'Add Fee',
		required: false,
		displayOptions: {
			show: {
				resource: [
					'event',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				name: 'feeValues',
				displayName: 'Fee',
				values: [
					{
						displayName: 'Accepts',
						name: 'accepts',
						type: 'options',
						options: [
							{
								name: 'Cash',
								value: 'cash',
							},
							{
								name: 'None',
								value: 'none',
							},
							{
								name: 'Paypal',
								value: 'paypal',
							},
							{
								name: 'Stripe',
								value: 'stripe',
							},
							{
								name: 'Wepay',
								value: 'wepay',
							},
						],
						default: '',
						description: 'The payment method for the event fee if a fee is charged for the event',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
							minValue: 1,
						},
						default: 0,
						description: `The amount of the event fee if a fee is charged for the event.</br>
						If the group is in the United States, this may not exceed 4999 (for any currency).</br>
						Otherwise, this may not exceed 1000000 (for any currency).</br>
						If the event fee is charged with WePay, this must be at least 1.0 USD`,
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'options',
						options: [
							{
								name: 'AUD',
								value: 'AUD',
							},
							{
								name: 'BRL',
								value: 'BRL',
							},
							{
								name: 'CAD',
								value: 'CAD',
							},
							{
								name: 'CHF',
								value: 'CHF',
							},
							{
								name: 'EUR',
								value: 'EUR',
							},
							{
								name: 'GBP',
								value: 'GBP',
							},
							{
								name: 'INR',
								value: 'INR',
							},
							{
								name: 'JPY',
								value: 'JPY',
							},
							{
								name: 'KRW',
								value: 'KRW',
							},
							{
								name: 'PLN',
								value: 'PLN',
							},
							{
								name: 'RUB',
								value: 'RUB',
							},
							{
								name: 'THB',
								value: 'THB',
							},
							{
								name: 'TRY',
								value: 'TRY',
							},
							{
								name: 'USD',
								value: 'USD',
							},
						],
						default: '',
						description: 'The currency for the event fee if a fee is charged for the event',
					},
					{
						displayName: 'Refund Policy',
						name: 'refundPolicy',
						type: 'string',
						typeOptions: {
							alwaysOpenEditWindow: true,
						},
						default: '',
						description: 'The refund policy if the event has a fee. May not be longer than 250 characters.',
					},
				],
			}
		],
	},
	{
		displayName: 'Location',
		name: 'locationUi',
		type: 'fixedCollection',
		default: '',
		placeholder: 'Add Location',
		required: false,
		displayOptions: {
			show: {
				resource: [
					'event',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				name: 'locationValues',
				displayName: 'Location',
				values: [
					{
						displayName: 'Lat',
						name: 'lat',
						type: 'number',
						default: 0,
						description: 'Float representing adjusted venue latitude. This can only be set if lon is included as well.',
					},
					{
						displayName: 'Lon',
						name: 'lon',
						type: 'number',
						default: 0,
						description: 'Float representing adjusted venue longitude. This can only be set if lat is included as well.',
					},
				],
			}
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 event:delete                               */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Options',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Remove From Calendar',
				name: 'removeFromCalendar',
				type: 'boolean',
				default: false,
				description: `when set to true, fully deletes the event. If set to false, </br>
				this operation cancels the event instead of completely removing it from the group's calendar.</br>
				This defaults to true when not set explicitly.`,
			},
			{
				displayName: 'Update Series',
				name: 'updateSeries',
				type: 'boolean',
				default: false,
				description: `when set to true, will update all future recurrences of this event if this event</br>
				belongs to an event series. Requesting this for an event that doesn't belong to an active series</br>
				will result in an error. You can detect an event's association with a series by sending</br>
				fields=series when requesting event data. This defaults to false, when not set explicitly`,
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 event:get                                  */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Options',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'get',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				description: 'A comma-delimited list of optional fields to append to the response',
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 event:getAll                               */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'event',
				],
			},
		},
		default: false,
		description: 'If all results should be returned or only up to a given limit.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'event',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		default: 100,
		description: 'How many results to return.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Desc',
				name: 'desc',
				type: 'boolean',
				default: false,
				description: 'When true, sorts results in descending order. Defaults to false',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				description: 'A comma-delimited list of optional fields to append to the response',
			},
			{
				displayName: 'Has Ended',
				name: 'hasEnded',
				type: 'boolean',
				default: false,
				description: 'An optional boolean which returns events which have ended when true. When false, returns events which are ongoing or upcoming',
			},
			{
				displayName: 'No Earlier Than',
				name: 'noEarlierThan',
				type: 'dateTime',
				default: '',
				description: `Represents a lower time bound (inclusive) for the start time of events in the local time of the group.`,
			},
			{
				displayName: 'No Later Than',
				name: 'noLaterThan',
				type: 'dateTime',
				default: '',
				description: `Represents an upper time bound (exclusive) for the start time of events in the local time of the group`,
			},
			{
				displayName: 'Scroll',
				name: 'scroll',
				type: 'options',
				options: [
					{
						name: 'Recent Past',
						value: 'recentPast',
						description: 'Scroll to the last past Meetup Event.',
					},
					{
						name: 'Next Upcoming',
						value: 'nextUpcoming',
						description: 'Scroll to the next upcoming Meetup event.',
					},
					{
						name: 'Future Or Past',
						value: 'futureOrPast',
						description: 'Scroll to the next ongoing or upcoming Meetup event.',
					},
				],
				default: 'nextUpcoming',
				description: 'An alias for a point on a timeline.',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Past',
						value: 'past',
					},
					{
						name: 'Proposed',
						value: 'proposed',
					},
					{
						name: 'Suggested',
						value: 'suggested',
					},
					{
						name: 'Upcoming',
						value: 'upcoming',
					},
				],
				default: [],
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 event:getAttendance                        */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getAttendance',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getAttendance',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'getAttendance',
				],
				resource: [
					'event',
				],
			},
		},
		default: false,
		description: 'If all results should be returned or only up to a given limit.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAttendance',
				],
				resource: [
					'event',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		default: 100,
		description: 'How many results to return.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'getAttendance',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Desc',
				name: 'desc',
				type: 'boolean',
				default: false,
				description: 'When true, sorts results in descending order. Defaults to false',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{
						name: 'name',
						value: 'name',
					},
					{
						name: 'Social',
						value: 'social',
					},
					{
						name: 'Time',
						value: 'time',
					},
				],
				default: 'name',
				description: `The sort order of returned attendees. The attendees are </br>
				sorted in ascending order, use 'desc' to sort in descending order instead`,
			},
		],
	},
/* -------------------------------------------------------------------------- */
/*                                 event:update                               */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getGroups',
		},
		required: true,
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'event',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'event',
				],
			},
		},
		options: [
			{
				displayName: 'Announce',
				name: 'announce',
				type: 'boolean',
				default: false,
				description: 'Whether or not Meetup should announce this event to group members',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'The description of the event, in simple HTML format',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 180,
				description: 'Representing event duration in minutes',
			},
			{
				displayName: 'Event Hosts',
				name: 'eventHosts',
				type: 'string',
				default: '',
				description: `Containing up to 5 comma-separated valid member ids for members</br>
				who will be hosts of the event. This defaults to the authenticated member when</br>
				self_rsvp is true or undefined`,
			},
			{
				displayName: 'Featured Photo ID',
				name: 'photoId',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: ' Identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set.',
			},
			{
				displayName: 'Guest Limit',
				name: 'guestLimit',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: '',
				description: 'Representing the number of guests that members may include in their RSVP, 0 inclusive',
			},
			{
				displayName: 'How To Find Us',
				name: 'howToFindUs',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'The description for the location of the host(s) at the event venue.',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the event',
			},
			{
				displayName: 'Publish Status',
				name: 'publishStatus',
				type: 'options',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
				],
				default: 'published',
				description: 'Whether an event will be published to the group or as a draft visible only to the leadership team.',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				description: 'The RSVP survey question for the event',
			},
			{
				displayName: 'RSVP Close Time',
				name: 'rsvpCloseTime',
				type: 'dateTime',
				default: '',
				description: 'The time before which members will be allowed to RSVP to the event',
			},
			{
				displayName: 'RSVP Limit',
				name: 'rsvpLimit',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Total number of RSVP slots available for the event. When defined as 0, there will be no set limit.',
			},
			{
				displayName: 'RSVP Open Time',
				name: 'rsvpOpenTime',
				type: 'dateTime',
				default: '',
				description: `The time after which members will be allowed to RSVP to the event.</br>
				This can only be set if there is a start time for the event.</br>
				This defaults to no RSVP open time restriction.`,
			},
			{
				displayName: 'Self RSVP',
				name: 'selfRsvp',
				type: 'boolean',
				default: true,
				description: `whether the authenticated member will be RSVP'd to the event upon creation.`,
			},
			{
				displayName: 'Event Time',
				name: 'time',
				type: 'dateTime',
				default: '',
				description: 'Event start time',
			},
			{
				displayName: 'Venue ID',
				name: 'venueId',
				type: 'number',
				default: 0,
				description: 'Identifier for a venue.',
			},
			{
				displayName: 'Venue Visibility',
				name: 'venueVisibility',
				type: 'options',
				options: [
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Members',
						value: 'members',
					},
				],
				default: 0,
				description: 'Whether the event venue and host location description will be visible to non-members of the hosting group',
			},
		],
	},
	{
		displayName: 'Fee',
		name: 'feeUi',
		type: 'fixedCollection',
		default: '',
		placeholder: 'Add Fee',
		required: false,
		displayOptions: {
			show: {
				resource: [
					'event',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				name: 'feeValues',
				displayName: 'Fee',
				values: [
					{
						displayName: 'Photo ID',
						name: 'photoId',
						type: 'number',
						typeOptions: {
							minValue: 0,
						},
						default: 0,
						description: ' Identifier for a photo, which must be one associated with this group. When undefined or 0, no photo is set.',
					},
					{
						displayName: 'Accepts',
						name: 'accepts',
						type: 'options',
						options: [
							{
								name: 'Cash',
								value: 'cash',
							},
							{
								name: 'None',
								value: 'none',
							},
							{
								name: 'Paypal',
								value: 'paypal',
							},
							{
								name: 'Stripe',
								value: 'stripe',
							},
							{
								name: 'Wepay',
								value: 'wepay',
							},
						],
						default: '',
						description: 'The payment method for the event fee if a fee is charged for the event',
					},
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
							minValue: 1,
						},
						default: 0,
						description: `The amount of the event fee if a fee is charged for the event.</br>
						If the group is in the United States, this may not exceed 4999 (for any currency).</br>
						Otherwise, this may not exceed 1000000 (for any currency).</br>
						If the event fee is charged with WePay, this must be at least 1.0 USD`,
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'options',
						options: [
							{
								name: 'AUD',
								value: 'AUD',
							},
							{
								name: 'BRL',
								value: 'BRL',
							},
							{
								name: 'CAD',
								value: 'CAD',
							},
							{
								name: 'CHF',
								value: 'CHF',
							},
							{
								name: 'EUR',
								value: 'EUR',
							},
							{
								name: 'GBP',
								value: 'GBP',
							},
							{
								name: 'INR',
								value: 'INR',
							},
							{
								name: 'JPY',
								value: 'JPY',
							},
							{
								name: 'KRW',
								value: 'KRW',
							},
							{
								name: 'PLN',
								value: 'PLN',
							},
							{
								name: 'RUB',
								value: 'RUB',
							},
							{
								name: 'THB',
								value: 'THB',
							},
							{
								name: 'TRY',
								value: 'TRY',
							},
							{
								name: 'USD',
								value: 'USD',
							},
						],
						default: '',
						description: 'The currency for the event fee if a fee is charged for the event',
					},
					{
						displayName: 'Refund Policy',
						name: 'refundPolicy',
						type: 'string',
						typeOptions: {
							alwaysOpenEditWindow: true,
						},
						default: '',
						description: 'The refund policy if the event has a fee. May not be longer than 250 characters.',
					},
				],
			}
		],
	},
	{
		displayName: 'Location',
		name: 'locationUi',
		type: 'fixedCollection',
		default: '',
		placeholder: 'Add Location',
		required: false,
		displayOptions: {
			show: {
				resource: [
					'event',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				name: 'locationValues',
				displayName: 'Location',
				values: [
					{
						displayName: 'Lat',
						name: 'lat',
						type: 'number',
						default: 0,
						description: 'Float representing adjusted venue latitude. This can only be set if lon is included as well.',
					},
					{
						displayName: 'Lon',
						name: 'lon',
						type: 'number',
						default: 0,
						description: 'Float representing adjusted venue longitude. This can only be set if lat is included as well.',
					},
				],
			}
		],
	},
] as INodeProperties[];
