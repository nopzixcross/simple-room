import { Component, OnInit } from "@angular/core";
import { DataService } from "../../core/data.service";

@Component({
  selector: "app-cost",
  templateUrl: "./cost.component.html",
  styleUrls: ["./cost.component.css"]
})
export class CostComponent implements OnInit {
  constructor(private data: DataService) {}
  cost;
  ngOnInit() {
    this.data.getCostList().subscribe(res => {
      this.cost = res;
    });
  }

  onDelete(item) {
    this.data.deleteCost(item.id);
  }
}
