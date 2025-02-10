import { Receiver } from "./Receiver";


export class ReplyNote
{
    id?:number;
    receivers:Receiver[] = []
    content?:string
    isUrgent?:boolean
}