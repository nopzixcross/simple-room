import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Room {
  id?: string;
  name?: string;
  rate?: string;
}

@Component({
  selector: "app-edit-room",
  templateUrl: "./edit-room.component.html",
  styleUrls: ["./edit-room.component.css"]
})
export class EditRoomComponent implements OnInit {
  houseId;
  roomId;
  mode;
  room: Room = {};

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.mode = router.snapshot.url[1].path == "edit" ? "edit" : "add";
    this.houseId = router.snapshot.params.houseId;
    if (this.mode == "edit") this.roomId = router.snapshot.params.roomId;
  }

  ngOnInit() {
    if (this.mode == "edit") {
      this.data.getRoomDetail(this.houseId, this.roomId).subscribe(res => {
        this.room = res;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { name, rate } = this.room;
    if (!name || !rate) {
      return;
    }
    if (this.mode == "add") {
      this.addDetail();
    } else {
      this.updateDetail();
    }
  }

  addDetail() {
    let { name, rate } = this.room;
    this.data.addRoomDetail(this.houseId, {
      name,
      rate: parseFloat(rate)
    });
  }

  updateDetail() {
    let { name, rate } = this.room;
    this.data.updateRoomDetail(this.houseId, this.roomId, {
      name,
      rate: parseFloat(rate)
    });
  }
}
