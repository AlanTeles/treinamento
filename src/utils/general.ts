export function serialize(obj: Array<{}> | any): string {
    let params = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            params.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
    }
    return params.join("&");
}
export function ruleOf3(x: number, y: number): number{
    return (x * 100) / y;
}