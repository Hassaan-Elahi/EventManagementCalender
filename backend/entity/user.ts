import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import {Event} from "./event";

@Entity()
@Unique(['email'])
export class User {
	
	@PrimaryGeneratedColumn('uuid')
	id: number;
	
	@Column()
	email: string;

	@Exclude()
	@Column()
	password: string;
	
	@Column()
	name: string;

	@OneToMany(type => Event, event => event.user)
	events: Event[]
	
	
}
