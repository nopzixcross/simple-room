import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.router.navigate(["/dashboard"]);
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
