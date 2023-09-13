import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { IssuesComponent } from './issues.component';
import { IssuesService } from './services/issues.service';
import { IssueReportComponent } from './components/issue-report/issue-report.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { IssueEditComponent } from './components/issue-edit/issue-edit.component';

@NgModule({
  declarations: [
    IssuesComponent,
    IssueReportComponent,
    ConfirmDialogComponent,
    IssueEditComponent
  ],
  providers: [
    IssuesService
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  exports: [
    IssuesComponent
  ]
})
export class IssuesModule { }
