import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CandidatesGridComponent } from 'src/candidate/candidates-grid/candidates-grid.component';
import { CandidatesDetailComponent } from 'src/candidate/candidates-detail/candidates-detail.component';
import { ProfileCandidateComponent } from 'src/candidate/candidates-dashboard/profile-candidate/profile-candidate.component';
import { ChangePasswordCandidateComponent } from 'src/candidate/candidates-dashboard/change-password-candidate/change-password-candidate.component';
import { ResumeCandidateComponent } from 'src/candidate/candidates-dashboard/resume-candidate/resume-candidate.component';
import { ManageCandidaciesCandidateComponent} from 'src/candidate/candidates-dashboard/manage-candidacies-candidate/manage-candidacies-candidate.component';
import { SavedJobsCandidateComponent } from 'src/candidate/candidates-dashboard/saved-jobs-candidate/saved-jobs-candidate.component';
import { ResumePDFComponent } from 'src/candidate/resume-pdf/resume-pdf.component';
import { RecruiterGridComponent } from 'src/recruiter/recruiter-grid/recruiter-grid.component';
import { RecruiterDetailComponent } from 'src/recruiter/recruiter-detail/recruiter-detail.component';
import { ProfileRecruiterComponent } from 'src/recruiter/recruiter-dashboard/profile-recruiter/profile-recruiter.component';
import { ChangePasswordRecruiterComponent } from 'src/recruiter/recruiter-dashboard/change-password-recruiter/change-password-recruiter.component';
import { ManageCandidatesComponent } from 'src/recruiter/recruiter-dashboard/manage-candidates/manage-candidates.component';
import { ManageJobsComponent } from 'src/recruiter/recruiter-dashboard/manage-jobs/manage-jobs.component';
import { PostNewJobComponent } from 'src/recruiter/recruiter-dashboard/post-new-job/post-new-job.component';
import { JobDetailComponent } from 'src/job/job-detail/job-detail.component';
import { JobListComponent } from 'src/job/job-list/job-list.component';
import { CandidatesDashboardComponent } from 'src/candidate/candidates-dashboard/candidates-dashboard.component';
import { RecruiterDashboardComponent } from 'src/recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { ManageMessagesCandidateComponent } from 'src/candidate/candidates-dashboard/manage-messages-candidate/manage-messages-candidate.component';
import { ManageMessagesRecruiterComponent } from 'src/recruiter/recruiter-dashboard/manage-messages-recruiter/manage-messages-recruiter.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component: LayoutComponent},
  {path:'about', component: AboutComponent},
  {path:'contactus', component: ContactUsComponent},
  {path:'login', component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'candidatesGrid', component:CandidatesGridComponent, canActivate:[AuthGuard], data: {roles:['CANDIDATE']}},
  {path:'candidateDetail/:id', component:CandidatesDetailComponent, canActivate:[AuthGuard], data: {roles:['CANDIDATE']}},


  {path:'dashCandidat',component:CandidatesDashboardComponent, canActivate: [AuthGuard], data: {roles:['CANDIDATE']},children:[
  {path:'profileCandidate', component:ProfileCandidateComponent},
  {path:'changePasswordCandidate',component:ChangePasswordCandidateComponent},
  {path:'resumeCandidate',component:ResumeCandidateComponent},
  {path:'manageCandidaciesCandidate', component:ManageCandidaciesCandidateComponent},
  {path:'savedJobsCandidate',component:SavedJobsCandidateComponent},
  {path:'resumePDF', component:ResumePDFComponent},
  {path:'manageMessagesCandidate', component:ManageMessagesCandidateComponent}

] },
  


  {path:'recruiterGrid', component:RecruiterGridComponent, canActivate: [AuthGuard], data: {roles:['RECRUITER']}},
  {path:'recruiterDetail/:id', component:RecruiterDetailComponent},

  {path:'dashRecruiter', component:RecruiterDashboardComponent, canActivate: [AuthGuard], children:[
  {path:'profileRecruiter', component:ProfileRecruiterComponent},
  {path:'changePasswordRecruiter', component:ChangePasswordRecruiterComponent},
  {path:'manageCandidates', component:ManageCandidatesComponent},
  {path:'manageJobs', component:ManageJobsComponent},
  {path:'postNewJob', component:PostNewJobComponent},
  {path:'manageMessagesRecruiter', component:ManageMessagesRecruiterComponent}
  ]},


  {path:'jobDetail/:id', component:JobDetailComponent},
  {path:'jobList', component:JobListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
