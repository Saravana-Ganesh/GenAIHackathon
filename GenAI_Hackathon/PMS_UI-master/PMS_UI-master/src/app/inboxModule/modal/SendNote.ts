import { Receiver } from "./Receiver";


export class SendNote
{
    id?:number;
    receivers:Receiver[] = []
    content?:string
    isUrgent?:boolean
    sendUserName?:string;
}