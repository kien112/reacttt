import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const EmpEdit = () =>{
    const {empid} = useParams();
    // const [emp, setEmp] = useState({});
    useEffect(() =>{
        fetch("http://localhost:8000/employees/"+empid).then((res) =>{
            return res.json();
        }).then((resp) =>{
            setId(resp.id);
            setName(resp.name);
            setEmail(resp.email);
            setPhone(resp.phone);
        }).catch((err) =>{
            console.log(err.message);
        })
    }, [])

    const[id, setId] = useState("");
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
     const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const emp = {id,name,email,phone};
       
        fetch("http://localhost:8000/employees/"+empid,{
            method:"PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(emp)
        }).then((res)=>{
            alert("Ok");
            navigate("/");
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-title">
              <h2>Edit</h2>
            </div>
            <div className="card-body">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>ID</label>
                  <input value={id} disabled="disabled" type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                    <button className="btn btn-success" type="submit">Save</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
}


export default EmpEdit;