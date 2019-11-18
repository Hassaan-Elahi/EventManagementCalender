import { getRepository } from 'typeorm'
import { Request, Response } from 'express';
import {classToPlain, TransformClassToPlain} from "class-transformer";
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
		res.status(200).json( {user: classToPlain(user), token: token} );
		
	}
	else 
	{
		res.status(401).send({ error: "unAuthorized"} )
	}
}


export async function resetPassword(req: Request, res: Response) {
	
	const userRepo = getRepository(User);
	let user = null;
	try {
		user = await userRepo.findOneOrFail(res.locals.currentUserId)
	} 
	catch (e) {
		res.status(404).json({message: e.message})	
	}
	
	user.password = req.body.password;
	await userRepo.save(user);
	
	// // sending new token -- ASK
	// const newToken = jwt.sign(res.locals.currentUserId, environment.JWT_SECRET);
	// res.cookie("token", newToken, { httpOnly:true });
	//
	
	res.status(200).json({});
	
}
