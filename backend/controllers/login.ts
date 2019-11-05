import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";

export async function login (req: Request, res: Response) 
{
	const email = req.body.email;
	const password = req.body.password;
	const userRepo = getRepository(User);
	
	const user = await userRepo.findOne({
		where: { 'email': email}
	})
	if (user !== undefined && user.password === password)
	{
		res.status(200).send(user)
	}
	else 
	{
		res.status(401).send({ error: "unAuthorized"} )
	}
}
