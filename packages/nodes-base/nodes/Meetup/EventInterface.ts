import { IDataObject } from "n8n-workflow";

export interface IEvent {
	announce?: boolean;
	description?: string;
	duration?: number;
	event_hosts?: string;
	featured_photo_id?: number;
	fee?: IDataObject;
	guest_limit?: number;
	how_to_find_us?: string;
	lat?: number;
	lon?: number;
	name?: string;
	publish_status?: string;
	question?: string;
	rsvp_close_time?: number;
	rsvp_limit?: number;
	rsvp_open_time?: number;
	self_rsvp?: boolean;
	time?: number;
	venue_id?: number;
	venue_visibility?: string;
}
