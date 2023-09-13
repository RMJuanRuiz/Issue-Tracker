import { Component, OnInit } from '@angular/core';

import { IssuesService } from './services/issues.service';
import { Issue } from './models/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  showReportIssueForm = false;
  selectedIssue: Issue | null = null;
  issueToEdit: Issue | null = null;

  get showIssuesList(): boolean{
    return this.showReportIssueForm === false && !this.issueToEdit
  }

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseReportForm(): void {
    this.showReportIssueForm = false;
    this.getIssues();
  }

  onCloseEditForm(): void {
    this.issueToEdit = null;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getIssues();
    }

    this.selectedIssue = null;
  }

  private getIssues(): void {
    this.issues = this.issuesService.getPendingIssues();
  }
}
