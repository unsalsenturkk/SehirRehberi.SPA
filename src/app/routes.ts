import { Routes } from "@angular/router";
import { CityDetailComponent } from "./city/city-detail/city-detail.component";
import { CityComponent } from "./city/city.component";
import { ValueComponent } from "./value/value.component";
import { TestComponent } from "./test/test.component";


export const appRoutes : Routes = [
    { path: "city", component: CityComponent },
    { path: "value", component: ValueComponent },
    { path: "cityDetail/:cityId", component: CityDetailComponent },
    { path: "test", component: TestComponent },
    { path: "**", redirectTo: "city", pathMatch: "full" },
];
