import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private _showLoading = new Subject<boolean>();
  loading = this._showLoading.asObservable();

  show() {
    const loading = true;
    this._showLoading.next(loading);
  }

  hide() {
    const loading = false;
    this._showLoading.next(loading);
  }
}
