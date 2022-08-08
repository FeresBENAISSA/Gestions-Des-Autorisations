import { User } from "./User";

export interface Autorisation {
    idAuto : Number;
    date :Date; 
    exitTime :Date; 
    returnTime :Date ;
    state :String; 
    description:String;
    user:User;
}