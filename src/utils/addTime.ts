import auth from "../config/auth";

export function addTime(minutes: number): Number{
    return Date.now() + minutes  * 60 * 1000;
}