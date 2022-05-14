import { CONFIG, ServiceMapping } from "../config/app.config";
import { DefaultConfig, HTTPConfig } from "../models/model";
import { HTTPService } from "./http.service";

let httpService: HTTPService;

export class GitService {
    httpService: HTTPService;

    constructor(httpService: HTTPService) {
        this.httpService = httpService;
    }
    
    async getProjectGroup(): Promise<any> {
        let option: HTTPConfig = new DefaultConfig();
        option.url = `${CONFIG.GIT_URL}${ServiceMapping.getProjectGroup}`;
        option.headers = { 'PRIVATE-TOKEN': CONFIG.PERSONAL_TOKEN };
        let response  = await this.httpService.makeHttpCall(option);
        return response.data;
    }

    async getProjectNames(projectGroupId: number): Promise<any> {
        let option: HTTPConfig = new DefaultConfig();
        option.url = `${CONFIG.GIT_URL}${ServiceMapping.getProjectGroup}${'/'}${projectGroupId}`;
        option.headers = { 'PRIVATE-TOKEN': CONFIG.PERSONAL_TOKEN };
        let response  = await this.httpService.makeHttpCall(option);
        return response.data;
    }

}
