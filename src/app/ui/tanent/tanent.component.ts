import { Component, OnInit } from "@angular/core";
import { DataService } from "../../core/data.service";

@Component({
  selector: "app-tanent",
  templateUrl: "./tanent.component.html",
  styleUrls: ["./tanent.component.css"]
})
export class TanentComponent implements OnInit {
  constructor(private data: DataService) {}
  tanent;
  ngOnInit() {
    this.data.getTanentList().subscribe(res => {
      this.tanent = res;
    });
  }

  onDelete(item) {
    this.data.deleteTanent(item.id);
  }
}
