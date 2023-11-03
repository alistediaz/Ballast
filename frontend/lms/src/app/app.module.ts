import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAdminComponent } from './course-admin/course-admin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    CourseListComponent,
    CourseAdminComponent,
    LoginComponent,
    CourseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: CourseListComponent },
      { path: 'courses/:courseId', component: CourseDetailsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: CourseAdminComponent },
    ]),
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
