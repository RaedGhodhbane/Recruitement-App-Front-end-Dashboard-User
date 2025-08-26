import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { CandidatesDetailComponent } from 'src/candidate/candidates-detail/candidates-detail.component';
import { CandidatesDashboardComponent } from 'src/candidate/candidates-dashboard/candidates-dashboard.component';
import { CandidatesGridComponent } from 'src/candidate/candidates-grid/candidates-grid.component';
import { RecruiterDashboardComponent } from 'src/recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterDetailComponent } from 'src/recruiter/recruiter-detail/recruiter-detail.component';
import { RecruiterGridComponent } from 'src/recruiter/recruiter-grid/recruiter-grid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProfileCandidateComponent } from 'src/candidate/candidates-dashboard/profile-candidate/profile-candidate.component';
import { ChangePasswordCandidateComponent } from 'src/candidate/candidates-dashboard/change-password-candidate/change-password-candidate.component';
import { ResumeCandidateComponent } from 'src/candidate/candidates-dashboard/resume-candidate/resume-candidate.component';
import { ManageCandidaciesCandidateComponent} from 'src/candidate/candidates-dashboard/manage-candidacies-candidate/manage-candidacies-candidate.component';
import { SavedJobsCandidateComponent } from 'src/candidate/candidates-dashboard/saved-jobs-candidate/saved-jobs-candidate.component';
import { ProfileRecruiterComponent } from 'src/recruiter/recruiter-dashboard/profile-recruiter/profile-recruiter.component';
import { ChangePasswordRecruiterComponent } from 'src/recruiter/recruiter-dashboard/change-password-recruiter/change-password-recruiter.component';
import { ManageCandidatesComponent } from 'src/recruiter/recruiter-dashboard/manage-candidates/manage-candidates.component';
import { ManageJobsComponent } from 'src/recruiter/recruiter-dashboard/manage-jobs/manage-jobs.component';
import { PostNewJobComponent } from 'src/recruiter/recruiter-dashboard/post-new-job/post-new-job.component';
import { ResumePDFComponent } from 'src/candidate/resume-pdf/resume-pdf.component';
import { JobDetailComponent } from 'src/job/job-detail/job-detail.component';
import { JobListComponent } from 'src/job/job-list/job-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { CandidatesDashboardHeaderComponent } from 'src/candidate/candidates-dashboard/candidates-dashboard-header/candidates-dashboard-header.component';
import { RecruiterDashboardHeaderComponent } from '../recruiter/recruiter-dashboard/recruiter-dashboard-header/recruiter-dashboard-header.component';
import { ManageMessagesCandidateComponent } from '../candidate/candidates-dashboard/manage-messages-candidate/manage-messages-candidate.component';
import { ManageMessagesRecruiterComponent } from 'src/recruiter/recruiter-dashboard/manage-messages-recruiter/manage-messages-recruiter.component';
import { RechercheJobPipe } from './pipes/rechercheJob.pipe';
import { RechercheCandidaciesPipe } from './pipes/recherche-candidacies.pipe';
import { RechercheCandidatesPipe } from './pipes/recherche-candidates.pipe';
import { RechercheMessagesPipe } from './pipes/recherche-messages.pipe';
import { RechercheRecruitersPipe } from './pipes/recherche-recruiters.pipe';
import { RechercheCandidatiesByCandidatePipe } from './pipes/recherche-candidaties-by-candidate.pipe';
import { RechercheAddressPipe } from './pipes/recherche-address.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    CandidatesDashboardComponent,
    CandidatesDetailComponent,
    CandidatesGridComponent,
    RecruiterDashboardComponent,
    RecruiterDetailComponent,
    RecruiterGridComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactUsComponent,
    ProfileCandidateComponent,
    ChangePasswordCandidateComponent,
    ResumeCandidateComponent,
    ManageCandidaciesCandidateComponent,
    SavedJobsCandidateComponent,
    ProfileRecruiterComponent,
    ChangePasswordRecruiterComponent,
    ManageCandidatesComponent,
    ManageJobsComponent,
    PostNewJobComponent,
    ResumePDFComponent,
    JobDetailComponent,
    JobListComponent,
    CandidatesDashboardHeaderComponent,
    RecruiterDashboardHeaderComponent,
    ManageMessagesCandidateComponent,
    ManageMessagesRecruiterComponent,
    RechercheJobPipe,
    RechercheCandidaciesPipe,
    RechercheCandidatesPipe,
    RechercheMessagesPipe,
    RechercheRecruitersPipe,
    RechercheCandidatiesByCandidatePipe,
    RechercheAddressPipe
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
