import { Role } from "./Role";

export interface User {
    id :Number;
    name :String ;
    username :String ;
    password :String;
    email :string ; 
    roles : Role[];
}