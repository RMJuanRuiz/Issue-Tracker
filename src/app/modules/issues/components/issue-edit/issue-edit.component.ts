import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Issue, IssueForm } from '../../models/issue';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css'],
})
export class IssueEditComponent implements OnInit {
  @Input({ required: true }) issue: Issue | undefined;
  @Output() formClose = new EventEmitter();

  issueForm: FormGroup<IssueForm> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private issuesService: IssuesService
  ) {}

  ngOnInit(): void {
    if (this.issue) {
      this.issueForm = this.formBuilder.group<IssueForm>({
        title: new FormControl(this.issue.title, {
          nonNullable: true,
          validators: Validators.required,
        }),
        description: new FormControl(this.issue.description, {
          nonNullable: true,
        }),
        priority: new FormControl(this.issue.priority, {
          nonNullable: true,
          validators: Validators.required,
        }),
      });
    }
  }

  save(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    if (this.issue) {
      this.issuesService.updateIssue(
        this.issue.issueNo,
        this.issueForm?.getRawValue() as Issue
      );

      this.formClose.emit();
    }
  }
}
