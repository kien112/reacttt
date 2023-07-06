import { Alert, AlertTitle } from "@mui/material";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header, LayoutContext } from "antd/es/layout/layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSucceeded, setIsSucceed] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const emp = { name, email, phone };

    fetch("http://localhost:8000/employees", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(emp),
    })
      .then((res) => {
        setIsSucceed(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-title">
              <h2>Create</h2>
            </div>
            <div className="card-body">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>ID</label>
                  <input
                    value={id}
                    disabled="disabled"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                  <Link to="/" className="btn btn-danger">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Mess isSuccessed={isSucceeded}/>
    </div>
  );
};


function Mess(props) {
  const isSuccessed = props.isSuccessed;
  if(isSuccessed){
    return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    )
  }
}

export default EmpCreate;
