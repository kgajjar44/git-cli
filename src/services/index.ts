import { GitService } from "./git.service";
import { HTTPService } from "./http.service";

let httpService = new HTTPService();
export let gitService = new GitService(httpService);