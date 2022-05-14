import inquirer from 'inquirer';

import { Answer } from '../models/model';

export class QuestionsList {

    async projectGroupQuestion(projectGroupDetails: any): Promise<Answer> {
        let listOfProjectGroup = projectGroupDetails.map((projectGroup: any) => {
            return { name: projectGroup.name, value : projectGroup.id };
        })
    
        return inquirer.prompt([{ 
            name: 'projectGroupId',
            type: 'list',
            message: 'Which project group you want to select?',
            choices: listOfProjectGroup,
        }]);
    
    }

    async projectSelectionQuestion(repoDetails: any): Promise<Answer> {
        let listOfRepos = repoDetails.projects.map((repo: any) => {
            return { name: repo.name, value : repo.web_url };
        })
    
        return inquirer.prompt([{ 
            name: 'repoUrl',
            type: 'list',
            message: 'Which project group you want to select?',
            choices: listOfRepos,
        }]);
    
    }

}
