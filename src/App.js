import './App.css';
import { Navbar } from './MyComponents/Nabar/Navbar';
import { Categorymain } from './MyComponents/Category/Categorymain';
import { Corouselnew } from './MyComponents/Corousel/Corouselnew';
import { useState, useEffect } from "react";
import { Loginform } from './MyComponents/Nabar/Loginform';


function App() {
  const [categoryData, setCategoryData] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-json");
        const data = await response.json();
       
        // Filter out the ID from the response data
        const filteredData = filterIdFromData(data);
       
        setCategoryData(filteredData);
      } catch (error) {
        console.log("error fetching the data", error);
      } 
    }
    fetchData();
  }, []);

  // Function to recursively filter out the _id field from nested objects
  const filterIdFromData = (data) => {
    const filteredData = {};
    Object.keys(data).forEach(key => {
      if (key !== "_id" && key !== "__v") {
        if (Array.isArray(data[key])) {
          filteredData[key] = data[key].map(item => filterIdFromData(item));
        } else if (typeof data[key] === "object") {
          filteredData[key] = filterIdFromData(data[key]);
        } else {
          filteredData[key] = data[key];
        }
      }
    });
    return filteredData;
  }

  return (
    <div className="App">
     <Navbar setShowLoginForm={setShowLoginForm} />
      {showLoginForm && <Loginform onClose={() => setShowLoginForm(false)} />}
      <Corouselnew categoryData={categoryData} />
      <Categorymain categoryData={categoryData} />   
    </div>
  );
}

export default App;
