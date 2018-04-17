import { promisify } from 'util';
import { Get, Controller } from '@nestjs/common';
import JiraApi from './jira/jira-api';
import Options from './jira/options.dto';

@Controller()
export class AppController {
  @Get()
  async root(): Promise<any> {
    const options: Options = {
      host: '',
      username: '',
      password: '',
    };

    const jira = new JiraApi(options);
    const { data } = await jira.findIssue('DAB-1578');
    return data;
  }
}
