import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface House {
  id?: string;
  name?: string;
  address?: string;
}

@Component({
  selector: "app-edit-house",
  templateUrl: "./edit-house.component.html",
  styleUrls: ["./edit-house.component.css"]
})
export class EditHouseComponent implements OnInit {
  id;
  mode;
  house: House = {};

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.mode = router.snapshot.url[1].path == "edit" ? "edit" : "add";
    if (this.mode == "edit") this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    if (this.mode == "edit") {
      this.data.getHouseDetail(this.id).subscribe(res => {
        this.house = res;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { name, address } = this.house;
    if (!name || !address) {
      return;
    }
    if (this.mode == "add") {
      this.addDetail();
    } else {
      this.updateDetail();
    }
  }

  addDetail() {
    let { name, address } = this.house;
    this.data.addHouseDetail({
      name,
      address
    });
  }

  updateDetail() {
    let { name, address } = this.house;
    this.data.updateHouseDetail(this.id, {
      name,
      address
    });
  }
}
