import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

const route: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path: "home/:item",
    component: HomeComponent
  },
  {
    path: "series",
    component: SeriesComponent
  },
  {
    path: "series/:id",
    component: SeriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(route), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
