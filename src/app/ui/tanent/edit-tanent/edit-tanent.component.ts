import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Tanent {
  id?: string;
  name?: string;
  member?: string;
}

@Component({
  selector: "app-edit-tanent",
  templateUrl: "./edit-tanent.component.html",
  styleUrls: ["./edit-tanent.component.css"]
})
export class EditTanentComponent implements OnInit {
  id;
  mode;
  tanent: Tanent = {};

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.mode = router.snapshot.url[1].path == "edit" ? "edit" : "add";
    if (this.mode == "edit") this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    if (this.mode == "edit") {
      this.data.getTanentDetail(this.id).subscribe(res => {
        this.tanent = res;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { name, member } = this.tanent;
    if (!name || !member) {
      return;
    }
    if (this.mode == "add") {
      this.addDetail();
    } else {
      this.updateDetail();
    }
  }

  addDetail() {
    let { name, member } = this.tanent;
    this.data.addTanentDetail({ name, member: parseFloat(member) });
  }

  updateDetail() {
    let { name, member } = this.tanent;
    this.data.updateTanentDetail(this.id, { name, member: parseFloat(member) });
  }
}
