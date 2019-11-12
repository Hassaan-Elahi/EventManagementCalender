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
		const events = await eventRepo.find({where: { user: res.locals.currentUserId} });
		
		const newEvents = [];
		for (let e of events) {
			const startTime = moment.utc(e.startTime, environment.dateTimeFormat);
			const endTime = moment.utc(e.endTime, environment.dateTimeFormat);
			if (startTime.get('month') == date.get('month') && startTime.get('year') == date.get('year')) {
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
	
		event = await eventRepo.findOneOrFail( {where: {id:parseInt(req.params.id) , userId: res.locals.currentUserId} });
		res.status(200).json(event);
		
	} catch(err) {
	
		console.log(err);   
		res.status(500).json({message: err.message})
		
	}
	
	
}

function hasClash(allEvents: Event[], currentEvent: Event): any {
		/*
		returns null for no clash 
		returns clashed event for clash 
		*/
		
		const startTime = moment.utc(currentEvent.startTime, environment.dateTimeFormat);
		const endTime = moment.utc(currentEvent.endTime, environment.dateTimeFormat);
		
		for (let e of allEvents) {
			const eStartTime = moment.utc(e.startTime, environment.dateTimeFormat);
			const eEndTime = moment.utc(e.endTime, environment.dateTimeFormat);
			
			// for clash condition
			if (!(endTime <= eStartTime || startTime >= eEndTime) ) {
				return e;
			}
			
		}
		return null;
}


export async function createEvent(req: Request, res: Response) {
	
	const name = req.body.name;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const description = req.body.description;
	const eventRepo = getRepository(Event);
	
	const allEvents = await eventRepo.find({where: {user: res.locals.currentUserId}});
	
	//could be optimized here
	
		
	 
	const event = new Event();
	event.name = name;
	event.startTime = startTime;
	event.endTime = endTime;
	event.description = description;
	event.user = await getRepository(User).findOneOrFail(res.locals.currentUserId); //must be changed here

	const clashEvent = hasClash(allEvents, event);
	if(!clashEvent) {
		
		try {
			await eventRepo.save(event);
			res.status(200).json({message: "Event Saved Successfully"});
		} catch (e) {
			res.status(400).json({message: e});
		}
	}
	else {
		res.status(400).json({message: `Event could not be created due to clash with event ${clashEvent.name} 
		which has startTime: ${clashEvent.startTime} and endTime: ${clashEvent.endTime}`})
	}
}
	
export async function updateEvent(req: Request, res: Response) {
	
	const id = req.body.id;
	const name = req.body.name;
	const startTime = req.body.startTime;
	const endTime = req.body.endTime;
	const description = req.body.description;
	const eventRepo = getRepository(Event);
	const event = await eventRepo.findOneOrFail({where: {id: id, user: res.locals.currentUserId}});
	
	event.name = name;
	event.startTime = startTime;
	event.endTime = endTime;
	event.description = description;
	event.user = await getRepository(User).findOneOrFail(res.locals.currentUserId); //must be changed here
	
	
	try {
		await eventRepo.save(event);
		res.status(200).json({message: "Event Saved Successfully"});
	} catch (e) {
		res.status(500).json({message: e});
	}
	
	
}



