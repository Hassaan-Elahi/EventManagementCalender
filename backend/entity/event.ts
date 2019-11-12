import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./user";

@Entity()
export class Event {
	
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	name: string;
	
	@Column()
	start_time: Date;
	@Column()
	end_time: Date;
	
	@Column()
	description: string;
	
	
	@ManyToOne(type => User, user => user.events)
	user: User;
	
}
