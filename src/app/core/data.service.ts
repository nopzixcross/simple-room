import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { forkJoin, concat, combineLatest, pipe, Subject, of } from "rxjs";
import { map, merge } from "rxjs/operators";

@Injectable()
export class DataService {
  constructor(private db: AngularFirestore) {}

  getHouseList() {
    let data = [];
    this.db.firestore
      .collection("house")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let index = data.push({ id: doc.id, ...doc.data() }) - 1;
          data[index]["room"] = [];
          this.db.firestore
            .collection("house")
            .doc(doc.id)
            .collection("room")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                data[index].room.push({ id: doc.id, ...doc.data() });
              });
            });
        });
      });
    return data;
  }

  getHouseDetail(id) {
    return this.getDetail("house", id);
  }

  getTanentList() {
    return this.getDataList("tanent");
  }

  getRentalList() {
    return this.getDataList("rental");
  }

  getTanentDetail(id) {
    return this.getDetail("tanent", id);
  }

  getCostList() {
    return this.getDataList("cost");
  }

  getCostDetail(id) {
    return this.getDetail("cost", id);
  }

  getRoomList(documentId) {
    let data = [];
    this.db.firestore
      .collection("house")
      .doc(documentId)
      .collection("room")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
      });
    return data;
  }

  getRoomDetail(houseId, roomId) {
    return this.db
      .collection("house")
      .doc(houseId)
      .collection("room")
      .doc(roomId)
      .snapshotChanges()
      .pipe(
        map(res => {
          const id = res.payload.id;
          const detail = res.payload.data();
          return { id, ...detail };
        })
      );
  }

  getRentalDetail(id) {
    return this.getDetail("rental", id);
  }

  filterByField(data, field, value) {
    return data.filter(res => {
      return res[field] == value;
    });
  }

  getDetail(collection, documentId) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .snapshotChanges()
      .pipe(
        map(res => {
          const id = res.payload.id;
          const detail = res.payload.data();
          return { id, ...detail };
        })
      );
  }

  getDataList(collection) {
    return this.db
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(res => {
            const id = res.payload.doc.id;
            const doc = res.payload.doc.data();
            return { id, ...doc };
          });
        })
      );
  }

  addHouseDetail(data) {
    return this.addDetail("house", data);
  }

  addRoomDetail(houseId, data) {
    this.db
      .collection("house")
      .doc(houseId)
      .collection("room")
      .add(data)
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  addCostDetail(data) {
    return this.addDetail("cost", data);
  }

  addTanentDetail(data) {
    return this.addDetail("tanent", data);
  }

  addRentalDetail(data) {
    return this.addDetail("rental", data);
  }

  addDetail(collection, data) {
    return this.db
      .collection(collection)
      .add(data)
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  setRentalData(documentId, data) {
    return this.setData("rental", documentId, data);
  }

  setTransactionData(data) {
    let electrityUnit;
    let waterSupplyUnit;
    this.getDetail("cost", "F6nKkGBmbpkSEnwuDuyZ").subscribe(res => {
      electrityUnit = parseFloat(res["base"]);
      data.forEach(transaction => {
        let {
          current_electrity,
          lastmonth_electrity,
          rental_id,
          tanentName,
          created_date,
          year,
          month
        } = transaction;
        let value = electrityUnit;
        let elecUnit = current_electrity - lastmonth_electrity;
        let elecAmount = elecUnit * value;
        return this.setData("transaction_electrity", transaction.id, {
          rental_id,
          tanentName,
          current_electrity: parseFloat(current_electrity),
          lastmonth_electrity: parseFloat(lastmonth_electrity),
          elecUnit,
          elecAmount,
          value,
          year,
          month,
          created_date
        });
      });
    });
    data.forEach(transaction => {
      this.getRoomDetail(transaction.houseId, transaction.roomId).subscribe(
        room => {
          let {
            rental_id,
            tanentName,
            year,
            month,
            created_date
          } = transaction;
          let roomRate = room["rate"];
          return this.setData("transaction_room", transaction.id, {
            rental_id,
            tanentName,
            roomRate,
            year,
            month,
            created_date
          });
        }
      );
    });
    this.getDetail("cost", "WhMxKfUhFylH8zDIp8H1").subscribe(res => {
      waterSupplyUnit = parseFloat(res["base"]);
      data.forEach(transaction => {
        let {
          tanentId,
          tanentName,
          created_date,
          year,
          month,
          member
        } = transaction;
        let waterSupplyvalue = waterSupplyUnit;
        let waterSupplyAmount = member * waterSupplyvalue;
        let docRef = `${year}_${month}_${tanentId}`;
        return this.setData("transaction_watersupply", docRef, {
          tanentId,
          tanentName,
          member,
          waterSupplyAmount,
          waterSupplyvalue,
          year,
          month,
          created_date
        });
      });
    });
  }

  setData(collection, documentId, data) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .set(data, { merge: true })
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  updateHouseDetail(documentId, data) {
    return this.updateDetail("house", documentId, data);
  }

  updateCostDetail(documentId, data) {
    return this.updateDetail("cost", documentId, data);
  }

  updateTanentDetail(documentId, data) {
    return this.updateDetail("tanent", documentId, data);
  }

  updateRoomDetail(houseId, roomId, data) {
    return this.db
      .collection("house")
      .doc(houseId)
      .collection("room")
      .doc(roomId)
      .set(data, { merge: true })
      .then(function() {
        console.log("Document successfully added!");
      })
      .catch(function(error) {
        console.error("Error add document: ", error);
      });
  }

  updateDetail(collection, documentId, data) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .update(data)
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  }

  deleteHouse(id) {
    return this.deleteData("house", id);
  }

  deleteRoom(id) {
    return this.deleteData("room", id);
  }

  deleteCost(id) {
    return this.deleteData("cost", id);
  }

  deleteTanent(id) {
    return this.deleteData("tanent", id);
  }

  deleteRental(id) {
    return this.deleteData("rental", id);
  }

  deleteData(collection, documentId) {
    return this.db
      .collection(collection)
      .doc(documentId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }
}
