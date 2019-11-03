import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { AddCityComponent } from './add-city/add-city.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { animation: 'isLeft' }},
  { path: 'add', component: AddCityComponent, canActivate: [AuthGuard], data: { animation: 'isAdd' }},
  { path: 'details/:city/:country', component: DetailsComponent, canActivate: [AuthGuard] , data: {animation: 'isRight'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
