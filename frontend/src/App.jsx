import React, { useState } from "react";
import { sendData } from "./apiCalls";

function App() {
  const [formdata, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    console.log(formdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setloading(true);

    try {
      const response = await sendData(formdata);
      if (response) {
        console.log(response);
        setloading(false);
        seterror(null);
        setData(response);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder="enter name of database" name="database" />
        <input onChange={handleChange} placeholder="enter name of table" name="table" />
        <input onChange={handleChange} placeholder="write your query" name="query" />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Response: {JSON.stringify(data)}</p>}
    </div>
  );
}

export default App;
