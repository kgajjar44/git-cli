import moment from "moment";
import { showTitleAndBanner } from "./config/logger.util";
import { Answer } from "./models/model";
import { questionsList } from "./questions";
import { gitService } from "./services";

export async function GitCLI(): Promise<any> {
    
    showTitleAndBanner();
    
    let projectGroups = await gitService.getProjectGroup();
    let providerAnswer: Answer = await questionsList.projectGroupQuestion(projectGroups);
    let repoDetails = await gitService.getProjectNames(providerAnswer.projectGroupId);
    Object.assign(providerAnswer, await questionsList.projectSelectionQuestion(repoDetails));
    Object.assign(providerAnswer, await questionsList.projectDateSelection({
        name: 'startDate',
        questionDesc: 'Start Date from which you want to retrieve commit',
    }));
    let startDateObject = moment(providerAnswer.startDate, 'YYYY-MM-DDTHH:mm:ssZ');
    Object.assign(providerAnswer, await questionsList.projectDateSelection({
        name: 'endDate',
        questionDesc: 'End Date till which you want to retrieve commit',
        minDateConfig: {
            year: startDateObject.format("YYYY"),
            month: startDateObject.format("MM"),
            day: startDateObject.format("DD"),
            hour: startDateObject.format("HH")
        }
    }));
    console.info(providerAnswer);
    let commitData = await gitService.getCommitList(providerAnswer);
    gitService.generateExcel(commitData);
}