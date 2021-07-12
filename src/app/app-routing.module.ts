import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
      { path : '', loadChildren: './page/page.module#PageModule' },
      { path : 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path : 'lecture', loadChildren: './lecture/lecture.module#LectureModule' }
  ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
