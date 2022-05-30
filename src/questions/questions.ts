import inquirer from 'inquirer';
import moment from 'moment';

import { Answer } from '../models/model';

export class QuestionsList {

    constructor() {
        inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
    }

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

    async projectDateSelection(dateQuestionConfig: any): Promise<Answer> {
        let dateConfig: any = { 
            name: dateQuestionConfig.name,
            type: 'datepicker',
            message: dateQuestionConfig.questionDesc,
            format: ['Y', '-', 'MM', '-', 'DD', 'T', 'HH', ':', 'mm', ':', 'ss', 'Z'],
            max: {
                year: moment().format("YYYY"),
                month: moment().format("MM"),
                day: moment().format("DD"),
                hour: moment().format("HH")
            }
        }

        if (!!dateQuestionConfig.minDateConfig) {
            dateConfig.min = dateQuestionConfig.minDateConfig;
        }

        return inquirer.prompt([dateConfig]);
    
    }

}
