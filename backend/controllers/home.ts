import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";


export async function getAllEvents(req: Request, res: Response)
{
	const month = req.params.month;
	const year = req.params.year;
	
	
}
