import { HTTPMethods } from "../config/app.config";

export interface Answer {
    projectGroupId: number;
    repoUrl: string;
}

export interface HTTPConfig {
    method: HTTPMethods.GET | HTTPMethods.POST | HTTPMethods.DELETE | HTTPMethods.PUT
    url: string;
    body?: any;
    headers?: any;
}

export class DefaultConfig {
    method = HTTPMethods.GET;
    url = "";
}