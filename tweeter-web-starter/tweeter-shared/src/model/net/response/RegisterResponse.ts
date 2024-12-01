import {UserDto} from "../../dto/UserDto";
import {TweeterResponse} from "./TweeterResponse";

export interface RegisterResponse extends TweeterResponse{
    readonly items: UserDto | null,
    readonly token: string
}