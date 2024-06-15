import React from 'react'

export const Categorylist = ({ categoryData }) => {
  
    return (
        // Category List items
        <div className="categoryList w-1/4 h-full mt-10 mt-4 border-4 h-96	">
          <h1 className="text-xl text-purple-700 h-16  flex justify-center items-center bg-gradient-to-r from-green-200 to-blue-300 text-white shadow-md rounded-lg transform hover:scale-105 hover:bg-yellow-100 hover:text-2xl transition-all duration-300">
          category
          </h1>
           
          <ul className="space-y">
   
          {
            Object.keys(categoryData).map((categoryName)=>{
              return(
                <li className="text-xl h-14 flex justify-center items-center text-lg hover:bg-yellow-200  hover:text-2xl">
             {categoryName}
            </li> 
              )
            })
          }
           
            
          </ul>
          <div>
     
      
    </div>
        </div>
      );
  
}
