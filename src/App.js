import "./App.css";
import { Navbar } from "./MyComponents/Nabar/Navbar";
import { Categorymain } from "./MyComponents/Category/Categorymain";
import { Corouselnew } from "./MyComponents/Corousel/Corouselnew";
import { useState, useEffect } from "react";
import { Loginform } from "./MyComponents/Nabar/Loginform";
import { NoResultsFound } from "./MyComponents/Category/NoResultsFound";

function App() {
  const [categoryData, setCategoryData] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [originalcategoryData,setOriginalcategoryData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://foodbloggingappbackend.onrender.com/get-json");
        const data = await response.json();
        
         
        const filteredData = filterIdFromData(data);
        setCategoryData(filteredData);
      } catch (error) {
        console.log("error fetching the data", error);
      }
    };
    fetchData();
  }, []);

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
  useEffect(() => {
    setIsEmpty(Object.keys(filteredCategoryData).length === 0);
  }, [filteredCategoryData]);

  return (
    <div className="App">
      <Navbar
        setShowLoginForm={setShowLoginForm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {showLoginForm && <Loginform onClose={() => setShowLoginForm(false)} />}
      {!searchQuery && <Corouselnew categoryData={categoryData} />}
      {isEmpty && searchQuery ? (
       <NoResultsFound/>
      ) : (
        <Categorymain categoryData={filteredCategoryData} />
      )}
    </div>
  );
}

export default App;
