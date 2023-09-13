import { Issue } from '../models/issue';
import { issuesMock } from 'src/assets/issues.mock';

export class IssuesService {
  private issues: Issue[] = issuesMock;

  constructor() {}

  getPendingIssues(): Issue[] {
    return this.issues.filter((issue) => !issue.completed);
  }

  getIssuesSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter((issue) => issue.title.indexOf(title) !== -1);
    }

    return [];
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  updateIssue(issueNo: number, issue: Issue) {
    const existingIssue = this.issues.find((i) => i.issueNo === issueNo);
    if (existingIssue) {
      const index = this.issues.indexOf(existingIssue);
      this.issues[index] = {
        ...existingIssue,
        ...issue,
      };
    }
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date(),
    };

    const index = this.issues.findIndex((i) => i.issueNo === issue.issueNo);
    this.issues[index] = selectedIssue;
  }
}
