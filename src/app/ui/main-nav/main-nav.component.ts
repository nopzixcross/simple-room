import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"]
})
export class MainNavComponent implements OnInit {
  show = false;
  visible = false;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(res => {
      if (res) {
        this.visible = true;
      }
    });
  }

  ngOnInit() {}

  toggleCollapse() {
    this.show = !this.show;
  }

  logout() {
    this.authService.signOut();
    this.visible = false;
    this.show = false;
  }
}
