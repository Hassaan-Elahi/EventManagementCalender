import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {User} from "../entity/user";
import * as jwt from 'jsonwebtoken';
import {environment} from "../environment";

export async function login (req: Request, res: Response) 
{
	const email = req.body.email;
	const password = req.body.password;
	const userRepo = getRepository(User);
	
	const user = await userRepo.findOne({
		where: { 'email': email}
	});
	if (user !== undefined && user.password === password)
	{
		// need to add a expiry here
		const token = jwt.sign(user.id, environment.JWT_SECRET);
		
		res.cookie("token", token, { httpOnly:true });
		res.status(200).json( {user: user, token: token} );
		
	}
	else 
	{
		res.status(401).send({ error: "unAuthorized"} )
	}
}
