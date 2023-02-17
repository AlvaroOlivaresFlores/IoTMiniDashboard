import "./Table.css";
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
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
            checked: false,
          };
          return datos;
        });
        const dataSortByDate = data.sort((a, b) => {
          // Format date: 2024-01-18 14:55:55
          const yearA = a.hora.split("-")[0];
          const monthA = a.hora.split("-")[1];
          const dayA = a.hora.split("-")[2].split(/(\s+)/)[0];
          const hourA = a.hora.split("-")[2].split(/(\s+)/)[2].split(":")[0];
          const minuteA = a.hora.split("-")[2].split(/(\s+)/)[2].split(":")[1];
          const secondA = a.hora.split("-")[2].split(/(\s+)/)[2].split(":")[2];
          const dateA = new Date( yearA, monthA, dayA, hourA, minuteA, secondA);
          const yearB = b.hora.split("-")[0];
          const monthB = b.hora.split("-")[1];
          const dayB = b.hora.split("-")[2].split(/(\s+)/)[0];
          const hourB = b.hora.split("-")[2].split(/(\s+)/)[2].split(":")[0];
          const minuteB = b.hora.split("-")[2].split(/(\s+)/)[2].split(":")[1];
          const secondB = b.hora.split("-")[2].split(/(\s+)/)[2].split(":")[2];
          const dateB = new Date( yearB, monthB, dayB, hourB, minuteB, secondB);
          return dateB - dateA;
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
            <th>temp</th>
            <th>humidity</th>
            <th>rad</th>
            <th>luxmeter</th>
            <th>PTCL 1</th>
            <th>PTCL 10</th>
            <th>PTCL 2.5</th>
            <th>bateria</th>
            <th>co2</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>hora</th>
            <th>hora server</th>
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
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function RowTable(props) {
  const data = props.data;
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = (e) => {
    if (e.currentTarget.checked) {
      if (props.deleteDevices.length === 0) {
        props.setDeleteDevices([
          { id: data.id, name: data.sensor_name, check: setIsChecked },
        ]);
        setIsChecked(true);
      } else {
        props.setDeleteDevices([
          ...props.deleteDevices,
          { id: data.id, name: data.sensor_name, check: setIsChecked },
        ]);
        setIsChecked(true);
      }
    } else {
      props.setDeleteDevices(
        props.deleteDevices.filter((d) => d.id !== data.id)
      );
      setIsChecked(false);
    }
  };

  return (
    <tr>
      <td>
        <input
          checked={isChecked}
          onChange={(e) => handleDelete(e)}
          type="checkbox"
          name=""
          id=""
        />
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
      <td>{data.hora_server}</td>
      <td>{data.tec}</td>
      <td>{data.lora_id}</td>
    </tr>
  );
}
