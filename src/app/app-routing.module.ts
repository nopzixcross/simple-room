import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./ui/login/login.component";
import { DashboardComponent } from "./ui/dashboard/dashboard.component";
import { AuthGuard } from "./core/auth.guard";
import { HouseComponent } from "./ui/house/house.component";
import { RoomComponent } from "./ui/room/room.component";
import { CostComponent } from "./ui/cost/cost.component";
import { TanentComponent } from "./ui/tanent/tanent.component";
import { EditCostComponent } from "./ui/cost/edit-cost/edit-cost.component";
import { EditTanentComponent } from "./ui/tanent/edit-tanent/edit-tanent.component";
import { EditRoomComponent } from "./ui/room/edit-room/edit-room.component";
import { EditHouseComponent } from "./ui/house/edit-house/edit-house.component";
import { RentalComponent } from "./ui/rental/rental.component";
import { EditRentalComponent } from "./ui/rental/edit-rental/edit-rental.component";
import { CutoffComponent } from "./ui/cutoff/cutoff.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "house", component: HouseComponent, canActivate: [AuthGuard] },
  {
    path: "house-room/:id",
    component: RoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "house/add",
    component: EditHouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "house/edit/:id",
    component: EditHouseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "room/add/:id",
    component: EditRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "room/edit/:id",
    component: EditRoomComponent,
    canActivate: [AuthGuard]
  },
  { path: "cost", component: CostComponent, canActivate: [AuthGuard] },
  {
    path: "cost/add",
    component: EditCostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cost/edit/:id",
    component: EditCostComponent,
    canActivate: [AuthGuard]
  },
  { path: "tanent", component: TanentComponent, canActivate: [AuthGuard] },
  {
    path: "tanent/add",
    component: EditTanentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "tanent/edit/:id",
    component: EditTanentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "rental",
    component: RentalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "rental/:id",
    component: EditRentalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cutoff",
    component: CutoffComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "/dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
