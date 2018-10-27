import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MediaMatcher } from "@angular/cdk/layout";
import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    public authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @ViewChild("sidenav")
  sidenav: MatSidenav;
  sidenavClose() {
    this.sidenav.close();
  }
}
