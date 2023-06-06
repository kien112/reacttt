import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetail = () =>{

    const {empid} = useParams();
    const [emp, setEmp] = useState({});
    useEffect(() =>{
        fetch("http://localhost:8000/employees/"+empid).then((res) =>{
            return res.json();
        }).then((resp) =>{
            setEmp(resp);
        }).catch((err) =>{
            console.log(err.message);
        })
    }, [])
    return (
        <div>
            {emp &&
                <div>
                <h1>{emp.name}  ({emp.id})</h1>
                </div>
            }
            <Link to="/">Back</Link>
        </div>
    );
}


export default EmpDetail;