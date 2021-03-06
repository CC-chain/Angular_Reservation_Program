import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NoAuthGuard } from './core/guard/no-auth.guard';
import { DefaultAdminLayoutComponent } from './layout/admin-layout';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'auth/login',
  pathMatch:'full'
},
{
  path: 'home/calendar',
  component: CalendarLayoutComponent,
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('@modules/calendar/calendar.module').then(m => m.CalendarLayoutModule)
},
{
  path: 'home/web',
  component: CalendarLayoutComponent,
  canActivate: [AuthGuard],
  loadChildren: () =>
      import('@modules/web-pages/web-pages.module').then(m => m.WebPagesModule)
},
{
  path: 'auth',
  loadChildren: () =>
  import('@modules/auth/auth.module').then(m => m.AuthModule)
},{
  path: 'admin',
  canActivate: [AuthGuard],
  loadChildren: () =>
  import('@modules/admin/admin.module').then(m => m.AdminModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
