import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MyaccountComponent } from "./myaccount/myaccount.component";
import { MainPanelComponent } from "./main-panel/main-panel.component";

const appRoutes = [
    { path: 'main', component: MainPanelComponent, children: [
        { path: 'home',  component: HomeComponent},
        { path: 'myaccount', component: MyaccountComponent}
    ]},
    { path: '', component: LoginComponent},
];
export const routing = RouterModule.forRoot(appRoutes);