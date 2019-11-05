import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";

export async function login (req: Request, res: Response) 
{
	const email = req.params.email;
	const password = req.params.password;
	const userRepo = getRepository(User);
	
	const user = await userRepo.findOne(email)
	if (user && user.password === password)
	{
		res.json( {user}, 200, 'success' )
	}
	else 
	{
		res.json( null, 400, 'unAuthorized' )	
	}
}
