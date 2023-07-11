import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const appRoutes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent}
];
export const routing = RouterModule.forRoot(appRoutes);