import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./user";
import {Runtime} from "inspector";

@Entity()
export class Event {
	
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	name: string;
	
	@Column()
	startTime: string;
	
	@Column()
	endTime: string;
	
	@Column()
	description: string;
	
	
	@ManyToOne(type => User, user => user.events)
	user: User;
	
	
	
	
	
	
}
