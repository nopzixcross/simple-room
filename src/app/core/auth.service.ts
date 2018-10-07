import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable, of } from "rxjs";
import { switchMap, startWith, tap, filter } from "rxjs/operators";
import { NotifyService } from "./notify.service";
import { Router } from "@angular/router";

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private notify: NotifyService,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update("Welcome new user!", "success");
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    if (!email || !password) {
      this.notify.update("Please input E-mail and Password!", "error");
      return;
    }
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update("Welcome back!", "success");
        this.router.navigate(["/dashboard"]);
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
      this.notify.clear();
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, "error");
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || "nameless user",
      photoURL: user.photoURL || "https://goo.gl/Fz9nrQ"
    };
    return userRef.set(data);
  }
}
