import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";
import { LoadingService } from "./../../core/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("email")
  email: ElementRef;
  @ViewChild("password")
  password: ElementRef;
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router
  ) {}
  loggedIn: boolean = true;
  ngOnInit() {
    this.loadingService.show();
    this.authService.user.subscribe(res => {
      if (res) {
        this.loggedIn = true;
        this.loadingService.hide();
        this.router.navigate(["/dashboard"]);
      } else {
        this.loggedIn = false;
        this.loadingService.hide();
      }
    });
  }

  login(event) {
    event.preventDefault();
    this.authService.emailLogin(
      this.email.nativeElement.value,
      this.password.nativeElement.value
    );
  }
}
