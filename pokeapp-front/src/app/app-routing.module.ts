import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { PokedexComponent } from './pokedex/pokedex/pokedex.component';
import { UserComponent } from './user/user.component';
import { LocationComponent } from './location/location.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'location/:id',
    component: LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
