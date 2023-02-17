import "./Table.css";
import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function Table(props) {
  const q = collection(db, props.deviceId);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const datos = {
            ...doc.data(),
            id: doc.id,
          };
          return datos;
        });
        const dataSortByDate = data.sort((a, b) => {
          const dateA = new Date(a.hora);
          const dateB = new Date(b.hora);
          return dateA - dateB;
        });
        setData(dataSortByDate);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }, [props.deviceId]);

  return (
    <div className="div-table">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>N</th>
            <th>sensor name</th>
            <th>temperature</th>
            <th>humidity</th>
            <th>radiation</th>
            <th>luxmeter</th>
            <th>particle 1</th>
            <th>particle 10</th>
            <th>particle 2.5</th>
            <th>bateria</th>
            <th>co2</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>hora</th>
            <th>tec</th>
            <th>lora ID</th>
          </tr>
          {data.map((data, index) => {
            const i = index + 1;
            return (
              <RowTable
                index={i}
                key={`${data.sensor_name}-${index}`}
                data={data}
                setDeleteDevices={props.setDeleteDevices}
                deleteDevices={props.deleteDevices}
              ></RowTable>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RowTable(props) {
  const data = props.data;

  const handleDelete = (e) => {
    if (e.currentTarget.checked) {
      props.setDeleteDevices([...props.deleteDevices, data.id]);
      props.deleteDevices.forEach(element => {
        console.log(element);
      });
    } else {
      // alert('not checked');
      props.setDeleteDevices(props.deleteDevices.filter((id) => id !== id));
    }
    console.log(props.deleteDevices);
  };

  return (
    <tr>
      <td>
        <input onChange={handleDelete} type="checkbox" name="" id="" />
      </td>
      <td>{props.index}</td>
      <td>{data.sensor_name}</td>
      <td>{data.temperature}</td>
      <td>{data.humidity}</td>
      <td>{data.radiation}</td>
      <td>{data.luxmeter}</td>
      <td>{data.particle1}</td>
      <td>{data.particle10}</td>
      <td>{data.particle25}</td>
      <td>{data.bateria}</td>
      <td>{data.co2}</td>
      <td>{data.latitude}</td>
      <td>{data.longitude}</td>
      <td>{data.hora}</td>
      <td>{data.tec}</td>
      <td>{data.lora_id}</td>
    </tr>
  );
}
