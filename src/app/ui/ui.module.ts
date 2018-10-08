import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { NotificationMessageComponent } from "./notification-message/notification-message.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { HouseComponent } from "./house/house.component";
import { RoomComponent } from "./room/room.component";
import { TanentComponent } from "./tanent/tanent.component";
import { CostComponent } from "./cost/cost.component";
import { RouterModule } from "@angular/router";
import { EditHouseComponent } from "./house/edit-house/edit-house.component";
import { EditRoomComponent } from "./room/edit-room/edit-room.component";
import { EditTanentComponent } from "./tanent/edit-tanent/edit-tanent.component";
import { EditCostComponent } from "./cost/edit-cost/edit-cost.component";
import { RentalComponent } from './rental/rental.component';
import { EditRentalComponent } from './rental/edit-rental/edit-rental.component';
import { CutoffComponent } from './cutoff/cutoff.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    LoginComponent,
    NotificationMessageComponent,
    DashboardComponent,
    MainNavComponent,
    HouseComponent,
    RoomComponent,
    TanentComponent,
    CostComponent,
    EditHouseComponent,
    EditRoomComponent,
    EditTanentComponent,
    EditCostComponent,
    RentalComponent,
    EditRentalComponent,
    CutoffComponent
  ],
  exports: [LoginComponent, NotificationMessageComponent, MainNavComponent]
})
export class UiModule {}
