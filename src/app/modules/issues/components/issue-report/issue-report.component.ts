import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Issue, IssueForm } from '../../models/issue';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  issuesSuggestions: Issue[] = [];

  @Output() formClose = new EventEmitter();

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
      this.issueForm.controls.title.valueChanges.subscribe(title => {
        this.issuesSuggestions = this.issuesService.getIssuesSuggestions(title);
      })
  }

  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched()
      return
    }
    
    this.issuesService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }
}
