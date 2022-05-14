import { showTitleAndBanner } from "./config/logger.util";
import { Answer } from "./models/model";
import { questionsList } from "./questions";
import { gitService } from "./services";

export async function GitCLI(): Promise<any> {
    
    showTitleAndBanner();
    let projectGroups = await gitService.getProjectGroup();
    let providerAnswer: Answer = await questionsList.projectGroupQuestion(projectGroups);
    let repoDetails = await gitService.getProjectNames(providerAnswer.projectGroupId);
    providerAnswer = await questionsList.projectSelectionQuestion(repoDetails);
    console.info(providerAnswer.repoUrl);
    
}