import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";
import {Event} from "../entity/event";
import * as moment from 'moment'
import {environment} from "../environment";



export async function deleteEvent(req: Request, res: Response) {
	
	const id = parseInt(req.params.id);
	const eventRepo = getRepository(Event);
	
	try {
	
		await eventRepo.delete(id);
		res.status(200).json( {deleted: true} );
		
	} catch (e) {

		res.status(400).json( { deleted: false, message: e })
		
	}
	
}

export async function getAllEvents(req: Request, res: Response) {
	
	const month = req.query.month;
	const year = req.query.year;
	const date = moment(new Date(year, month));
	const eventRepo = getRepository(Event);
	
	try {
		// getting all events
		const events = await eventRepo.find();
		
		const newEvents = [];
		for (let e of events) {
			const startTime = moment.utc(e.startTime, environment.dateTimeFormat);
			const endTime = moment.utc(e.endTime, environment.dateTimeFormat);
			if (startTime.get('month') == date.get('month') && startTime.get('year') == date.get('year')) {
				e.startTime = startTime.format(environment.dateTimeFormat);
				e.endTime = endTime.format(environment.dateTimeFormat)
				newEvents.push(e);
			}
		}
		
		res.status(200).json({data : events})
	}
	catch (e) {
		res.status(500).json({message: e})
	}
	
	
}

export async function getEvent(req: Request, res: Response) {
	
	let event;
	
	const eventRepo = getRepository(Event);
	
	try {
	
		event = await eventRepo.findOneOrFail(parseInt(req.params.id));
		event.startTime = moment.utc(event.startTime, environment.dateTimeFormat).format(environment.dateTimeFormat);
		event.endtTime = moment.utc(event.endTime, environment.dateTimeFormat).format(environment.dateTimeFormat);
		res.status(200).json(event);
		
	} catch(err) {
	
		console.log(err);   
		res.status(500).json({message: err.message})
		
	}
	
	
}



export async function createEvent(req: Request, res: Response) {
	
	const name = req.body.name;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const description = req.body.description;
	
	const eventRepo = getRepository(Event);
	const event = new Event();
	event.name = name;
	event.startTime = startTime;
	event.endTime = endTime;
	event.description = description;
	event.user = await getRepository(User).findOneOrFail(1); //must be changed here
	
	
	try {
		await eventRepo.save(event);
		res.status(200).json({message: "Event Saved Successfully"});
	} catch (e) {
		res.status(500).json({message: e});
	}
}
	
export async function updateEvent(req: Request, res: Response) {
	
	const id = req.body.id;
	const name = req.body.name;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const description = req.body.description;
	const eventRepo = getRepository(Event);
	const event = await eventRepo.findOneOrFail(id);
	
	event.name = name;
	event.startTime = startTime;
	event.endTime = endTime;
	event.description = description;
	event.user = await getRepository(User).findOneOrFail(1); //must be changed here
	
	
	try {
		await eventRepo.save(event);
		res.status(200).json({message: "Event Saved Successfully"});
	} catch (e) {
		res.status(500).json({message: e});
	}
	
	
}



