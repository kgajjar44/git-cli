import { CONFIG, ServiceMapping } from "../config/app.config";
import { Answer, DefaultConfig, HTTPConfig } from "../models/model";
import { HTTPService } from "./http.service";
import * as XLSX from "xlsx";

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

    async getProjectNames(projectGroupId: any): Promise<any> {
        let option: HTTPConfig = new DefaultConfig();
        option.url = `${CONFIG.GIT_URL}${ServiceMapping.getProjectGroup}${'/'}${projectGroupId}`;
        option.headers = { 'PRIVATE-TOKEN': CONFIG.PERSONAL_TOKEN };
        let response  = await this.httpService.makeHttpCall(option);
        return response.data;
    }

    async getCommitList(providerAnswer: Answer): Promise<any> {
        let commitList: any = [];
        let option: HTTPConfig = new DefaultConfig();
        let url: string = ServiceMapping.getCommitsList;
        let pageNumber: number = 1;
        url = url.replace('||PROJECT_ID||', providerAnswer.repoDetail.id);
        url = url.replace('||START_DATE||', providerAnswer.startDate);
        url = url.replace('||END_DATE||', providerAnswer.endDate);
        url = url.replace('||RECORDS_PER_PAGE||', CONFIG.RECORDS_PER_PAGE.toString());
        option.url = `${CONFIG.GIT_URL}${url.replace('||PAGE_NUMBER||', pageNumber.toString())}`;
        option.headers = { 'PRIVATE-TOKEN': CONFIG.PERSONAL_TOKEN };
        let response  = await this.httpService.makeHttpCall(option);
        while (response.data.length > 0) {
            commitList = commitList.concat(response.data);
            pageNumber++;
            option.url = `${CONFIG.GIT_URL}${url.replace('||PAGE_NUMBER||', pageNumber.toString())}`;
            response = await this.httpService.makeHttpCall(option);
        }
        return commitList;
    }

    generateExcel(commitData: any, providerAnswer: Answer) {
        let finalData: any = [];
        commitData.forEach((commit: any) => {
            finalData.push({
                'Git Commit Link': `${providerAnswer.repoDetail.web_url}${'/commit'}${commit.id}`,
                'Committed Date': commit.committed_date,
                'Author': commit.author_name,
                'Author Email Address': commit.author_email
            })
        });
        const ws = XLSX.utils.json_to_sheet(finalData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Responses');
        XLSX.writeFile(wb, 'Report.xlsx');
    }

}
