import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { NotifyService } from "./notify.service";
import { DataService } from "./data.service";
import { LoadingService } from "./loading.service";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    NotifyService,
    DataService,
    LoadingService
  ]
})
export class CoreModule {}
