import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Room {
  id?: string;
  name?: string;
  description?: string;
  rate?: string;
}

@Component({
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html",
  styleUrls: ["./edit-room.component.css"]
})
export class EditRoomComponent implements OnInit {
  id;
  mode;
  room: Room = {};

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.mode = router.snapshot.url[1].path == "edit" ? "edit" : "add";
    if (this.mode == "edit") this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    if (this.mode == "edit") {
      this.data.getRoomDetail(this.id).subscribe(res => {
        this.room = res;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { name, description, rate } = this.room;
    if (!name || !description || !rate) {
      return;
    }
    if (this.mode == "add") {
      this.addDetail();
    } else {
      this.updateDetail();
    }
  }

  addDetail() {
    let { name, description, rate } = this.room;
    this.data.addRoomDetail({
      name,
      description,
      rate: parseFloat(rate)
    });
  }

  updateDetail() {
    let { name, description, rate } = this.room;
    this.data.updateRoomDetail(this.id, {
      name,
      description,
      rate: parseFloat(rate)
    });
  }
}
