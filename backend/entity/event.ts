import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./user";

@Entity()
export class Event {
	
	@PrimaryGeneratedColumn('uuid')
	id: number;
	
	@Column()
	name: string;

	@Column({ type: 'timestamptz' })
	start_time: Date;

	@Column({ type: 'timestamptz' })
	end_time: Date;
	
	@Column()
	description: string;
	
	
	@ManyToOne(type => User, user => user.events)
	user: User;
	
}
