import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";
import {Event} from "../entity/event";
let config =  require('../config.json');



export async function getAllEvents(req: Request, res: Response) {
	
	const month = req.query.month;
	const year = req.query.year;
	const date = new Date(year, month);
	const eventRepo = getRepository(Event);
	
	try {
		// getting all events
		const events = await eventRepo.find();
	
		//filtering here
		events.filter(e => {
			return (e.startTime.getMonth() == date.getMonth() && e.startTime.getFullYear() == date.getFullYear())
		});
		
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
	event.id = 1; 
	
	
	try {
		await eventRepo.save(event);
		res.status(200).json({ message:"Event Saved Successfully"});
	}
	catch (e) {
		res.status(500).json({message: e});
	}
	
	
}


