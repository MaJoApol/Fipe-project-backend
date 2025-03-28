
export function addTime(minutes: number): number{
    return Date.now() + minutes  * 60 * 1000; 
}