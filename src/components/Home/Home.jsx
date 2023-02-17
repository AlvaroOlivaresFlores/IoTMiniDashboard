import "./Home.css";
import { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import Navbar from "../Navbar/Navbar";
import {
  onSnapshot,
  doc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";

export function BackdoorData() {
  // const [deviceName, setDeviceName] = useState("");

  const [newDevice, setNewDevice] = useState("");
  const [deleteDevices, setDeleteDevices] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [devicesRef, setData] = useState([]);
  const q = collection(db, "DEVICEID");

  const handleAddDevice = async () => {
    try {
      await addDoc(q, { id: newDevice });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    deleteDevices.forEach(async (element) => {
      element.check(false);
      await deleteDoc(doc(db, element.name, element.id));
    });
    setDeleteDevices([]);
  };

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data().id);
        setData(data);
        setDeviceName(`D1 / ${data[0]}`);
        setDeviceId(data[0]);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleBtn = (id, i) => {
    setDeviceName(`D${i} / ${id}`);
    setDeviceId(id);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="add-devices">
        <input
          onChange={(e) => setNewDevice(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="ID del dispositivo"
        />
        <button onClick={handleAddDevice} className="btn">
          Agregar
        </button>
      </div>
      <div className="btns">
        <div className="btn-d">
          {devicesRef.map((id, index) => {
            let i = index + 1;
            return (
              <button
                onClick={() => handleBtn(id, i)}
                key={id}
              >{`D${i}-${id}`}</button>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div className="table-title">
          <div>
            <h2>
              DISPOSITIVO: <span>{deviceName ? deviceName : ""}</span>
            </h2>
          </div>
          <div className="inp-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              name=""
              id=""
              placeholder="Buscar..."
            />
          </div>
          <div>
            <button onClick={() => handleDelete()} className="btn">
              Eliminar datos
            </button>
          </div>
        </div>
        <hr />
        {deviceId ? (
          <Table
            deleteDevices={deleteDevices}
            setDeleteDevices={setDeleteDevices}
            deviceId={deviceId}
          ></Table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
