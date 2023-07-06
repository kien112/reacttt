import { Button, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmpCreate from "./EmpCreate";
import LoadingSpinner from "./Loading";

const EmpListing = () => {
  const [employees, setEmp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/employees")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmp(resp);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const RemoveFunc = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch("http://localhost:8000/employees/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Ok removed");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <a
            onClick={() => {
              LoadEdit(item.id);
            }}
            className="btn btn-success"
          >
            Edit
          </a>
          <a
            onClick={() => {
              RemoveFunc(item.id);
            }}
            className="btn btn-danger"
          >
            Delete
          </a>
          <a
            onClick={() => {
              LoadDetail(item.id);
            }}
            className="btn btn-success"
          >
            Details
          </a>
        </Space>
      ),
    },
  ];
  
  const [open, setOpen] = useState(false);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div>
          <Link to="employee/create" className="btn btn-primary">
            Add New
          </Link>
          <Button type="primary" onClick={() => setOpen(true)}>
            Create
          </Button>
        </div>
        <div className="card-body">
          <Modal
            title="Create"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <EmpCreate />
          </Modal>
          <Table 
            dataSource={employees}
            columns={columns}
            />
          
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
