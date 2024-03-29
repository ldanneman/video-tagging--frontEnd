import React, { useState, useEffect } from "react";
import axios from "axios";
import { forwardRef } from "react";
import { BACK_PORT } from "../var";
import { Select } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Avatar from "react-avatar";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function Table5() {
  const token = localStorage.getItem("auth-token");

  const columns = [
    {
      title: "Avatar",
      render: (rowData) => (
        <Avatar
          maxInitials={1}
          size={40}
          round={true}
          name={rowData === undefined ? " " : rowData.first_name}
        />
      ),
    },
    { title: "ID", field: "_id", hidden: true },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Company", field: "companyID" },
    { title: "Role", field: "role" },
    {
      title: "Entity",
      field: "facilities",
      editComponent: ({ value, onChange }) => (
        <Select onChange={(e) => onChange(e.target.value)}>
          <option selected value={value}>
            {value}
          </option>
          {entities
            .filter((item) => item != value)
            .map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </Select>
      ),
    },
    { title: "Password", field: "password" },
  ];
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [entities, setEntities] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  let errorList = [];
  const handleRowAdd = (newData, resolve) => {
    if (errorList.length < 1) {
      axios
        .post(`${BACK_PORT}/user/register`, newData, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          alert(error?.response?.data);
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const handleRowUpdate = (newData, oldData, resolve) => {
    if (errorList.length < 1) {
      axios
        .post(`${BACK_PORT}/data/updateuser`, newData, {
          headers: { "auth-token": token },
        })
        // .patch("https://reqres.in/api/users/" + newData.id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axios
      .post(`${BACK_PORT}/data/delete-user`, oldData, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`${BACK_PORT}/data/users`, {
          headers: { "auth-token": token },
        }),
        axios.get(`${BACK_PORT}/data/get-entities`, {
          headers: { "auth-token": token },
        }),
      ])
      .then(
        axios.spread((usersRes, entitiesRes) => {
          setData(usersRes.data);
          setEntities(entitiesRes.data);
        })
      )
      .catch((error) => {
        setErrorMessages(["Cannot load user data"]);
        setIserror(true);
      });
  }, []);
  return (
    <div>
      <MaterialTable
        title="Users"
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
    </div>
  );
}

export default Table5;
