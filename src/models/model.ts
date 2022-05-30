import { HTTPMethods } from "../config/app.config";

export interface Answer {
    projectGroupId: number;
    repoDetail: any;
    startDate: string;
    endDate: string;
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