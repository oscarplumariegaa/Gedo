import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from "./home/home.component";

const appRoutes = [
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent}
];
export const routing = RouterModule.forRoot(appRoutes);