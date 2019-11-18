import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";
import {Event} from "../entity/event";
import * as moment from 'moment'
import {environment} from "../environment";
import {MoreThanOrEqual, LessThanOrEqual, MoreThan, LessThan, Raw, Brackets} from "typeorm";


export async function deleteEvent(req: Request, res: Response) {

	const id = req.params.id;
	const eventRepo = getRepository(Event);
	
	try {
	
		await eventRepo.delete(id);
		res.status(200).json( {deleted: true} );
		
	} catch (e) {

		res.status(400).json( { deleted: false, message: e })
		
	}
	
}

export async function getAllEventsMinimal(req: Request, res: Response) {
	
	
	const date = new Date(req.query.year, req.query.month);
	const eventRepo = getRepository(Event);
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	
	try {
		const events = await eventRepo.createQueryBuilder('event')
			.where("event.user = :id", {id: res.locals.currentUserId})
			.andWhere(new Brackets( q => 
			{
					q.where("date_part('month', event.start_time) = :givenMonth", {givenMonth: month });
					q.andWhere("date_part('year', event.start_time) = :givenYear", {givenYear: year});
			}))
			.orWhere(new Brackets( q =>
			{
				q.where("date_part('month', event.end_time) = :givenMonth", {givenMonth: month });
				q.andWhere("date_part('year', event.end_time) = :givenYear", {givenYear: year});
			}))
			.getMany();
			
		console.log(events);
		res.status(200).json({events})

	}
	catch (e) {
		res.status(500).json({message: e})
	}
	
	
}

export async function getEvents(req: Request, res: Response) {
	
	let event;
	const month = req.params.month;
	const year = req.params.year;
	const date = req.params.date;
	const givenDate = new Date(year,month, date);
	
	
	const eventRepo = getRepository(Event);
	

	try {

		event = await eventRepo.find( {
			where: {userId: res.locals.currentUserId, start_time: MoreThanOrEqual(givenDate), end_time: LessThanOrEqual(givenDate)},
					});

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
		
		let startTime = new Date(currentEvent.start_time);
		let endTime = new Date(currentEvent.end_time);

		for (let e of allEvents) {
			const eStartTime = new Date(e.start_time);
			const eEndTime = new Date(e.end_time);
			
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
	const startDate = new Date(startTime);
	const endDate = new Date(endTime);

	const allEvents = await eventRepo.find({where: {user: res.locals.currentUserId}});
	
	//could be optimized here
	
	const event = new Event();
	event.name = name;
	event.start_time = startTime;
	event.end_time = endTime;
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
		which has startTime: ${moment(clashEvent.startTime).format(environment.dateTimePrettyFormat)} and endTime: ${moment(clashEvent.startTime).format(environment.dateTimePrettyFormat)}`})
	}
}




export async function getEventsByEmail(req: Request, res: Response) {
	
	const email = req.query.email;
	
	try {
		
	const eventRepo = getRepository(Event);
	const events = await eventRepo.createQueryBuilder('event')
		.select(["event.id", "event.name", "event.start_time", "event.end_time","event.description"])
		.innerJoin("event.user", "user")
		.where('user.email = :email', {email: email})
		.getMany();
	
	res.status(200).json({events})
	
	} catch(err) {
	
		res.status(400).json({message: err.message})
		
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
	event.start_time = startTime;
	event.end_time = endTime;
	event.description = description;
	event.user = await getRepository(User).findOneOrFail(res.locals.currentUserId); //must be changed here
	
	
	try {
		await eventRepo.save(event);
		res.status(200).json({message: "Event Saved Successfully"});
	} catch (e) {
		res.status(500).json({message: e});
	}
	
	
}



