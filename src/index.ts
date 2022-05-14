import { GitCLI } from './gitcli';

export function index(): Promise<any> {
  return GitCLI();
};

index();