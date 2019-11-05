import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import {Event} from "./event";

@Entity()
@Unique(['email'])
export class User {
	
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	email: string;
	
	@Column()
	password: string;
	
	@Column()
	name: string;

	@OneToMany(type => Event, event => event.user)
	events: Event[]
	
	
}
