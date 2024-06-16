import "./App.css";
import { Navbar } from "./MyComponents/Nabar/Navbar";
import { Categorymain } from "./MyComponents/Category/Categorymain";
import { Corouselnew } from "./MyComponents/Corousel/Corouselnew";
import { useState, useEffect } from "react";
import { Loginform } from "./MyComponents/Nabar/Loginform";

function App() {
  const [categoryData, setCategoryData] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-json");
        const data = await response.json();
        console.log(data);
        // Filter out the ID from the response data
        const filteredData = filterIdFromData(data);

        setCategoryData(filteredData);
      } catch (error) {
        console.log("error fetching the data", error);
      }
    };
    fetchData();
  }, []);

  // Function to recursively filter out the _id field from nested objects
  const filterIdFromData = (data) => {
    const filteredData = {};
    Object.keys(data).forEach((key) => {
      if (key !== "_id" && key !== "__v") {
        if (Array.isArray(data[key])) {
          filteredData[key] = data[key].map((item) => filterIdFromData(item));
        } else if (typeof data[key] === "object") {
          filteredData[key] = filterIdFromData(data[key]);
        } else {
          filteredData[key] = data[key];
        }
      }
    });
    return filteredData;
  };

  const filterData = (data, query) => {
    if (!query) return data;

    const filteredData = {};
    Object.keys(data).forEach((categoryName) => {
      const filteredItems = data[categoryName].items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filteredData[categoryName] = {
          ...data[categoryName],
          items: filteredItems,
        };
      }
    });

    return filteredData;
  };

  const filteredCategoryData = filterData(categoryData, searchQuery);
  console.log(searchQuery);

  return (
    <div className="App">
      <Navbar
        setShowLoginForm={setShowLoginForm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {showLoginForm && <Loginform onClose={() => setShowLoginForm(false)} />}
      <Corouselnew categoryData={filteredCategoryData} />
      <Categorymain categoryData={filteredCategoryData} />
    </div>
  );
}

export default App;
