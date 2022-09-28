import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { ApiParams, BackEndProps } from "./../_types";

const DEFAULT_HEADERS = {'content-type': 'application/json'};
const DEFAULT_TIMEOUT = Number(process.env.REACT_APP_DEFAULT_TIMEOUT_REQUEST);

export const INSTANCE = axios.create({
    baseURL: process.env.REACT_APP_URL_API_HTTP,
    timeout: DEFAULT_TIMEOUT,
    responseType: "json"
});
export default async function api(alias:string, params={}, method:"POST"|"GET"|"PUT"|"DELETE"="POST", timeout=DEFAULT_TIMEOUT, headers?:any):Promise<BackEndProps>{
    return await sendRequest(createParams(alias, params, headers), method, timeout);
}
function createParams(alias:string, params={}, headers:any=DEFAULT_HEADERS):ApiParams{
    const accessToken = localStorage.getItem('Authorization');
    if(accessToken)
        headers = {...headers, "access-token": JSON.parse(accessToken)};

    alias = alias[0] === "/" ? alias.substring(1) : alias;
    return {
        "alias": alias,
        "params": headers["content-type"] === "application/json" ? JSON.stringify(params) : params,
        "accessToken": accessToken,
        "headers": headers,
        "time": new Date()
    }
}
async function sendRequest({alias, params, headers}:ApiParams, method: "POST"|"GET"|"PUT"|"DELETE", timeout:number):Promise<BackEndProps>{
    return await INSTANCE.request({
        url: alias,
        data: params,
        method: method,
        timeout: timeout,
        headers: headers,
        responseType: "json"
    })
    .then((response: AxiosResponse) => ({"FL_STATUS": true, "data": response.data, "requestError": false}))
    .catch((error: AxiosError) => {
        toast.error(error.message);
        return {
            "FL_STATUS": false, 
            "requestError": true,
            "data": undefined,
        };
    });
}