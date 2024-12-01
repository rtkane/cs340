import {TweeterResponse} from "./TweeterResponse";
import {UserDto} from "../../dto/UserDto";

export interface LoginResponse extends TweeterResponse{
    readonly items: UserDto | null,
    readonly token: string
}