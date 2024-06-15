import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Cardscontent } from './MyComponents/Category/Cardscontent';
import { Admineditcategory } from './MyComponents/Admin/Admineditcategory';
import { Admincardsedit } from './MyComponents/Admin/Admincardsedit';
import { AdminProvider } from './MyComponents/Admin/Admincontext';
import { ProtectedRoute } from './MyComponents/ProtectedRoute';
import { Admincardscontent } from './MyComponents/Admin/Admincardscontent';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Cardscontent", element: <Cardscontent /> },
  {
    path: "/Admineditcategory",
    element: (
      <ProtectedRoute>
        <Admineditcategory />
      </ProtectedRoute>
    )
  },
  {
    path: "/Admincardsedit",
    element: (
      <ProtectedRoute>
        <Admincardsedit />
      </ProtectedRoute>
    )
  },
  {
    path: "/Admincardscontent",
    element: (
      <ProtectedRoute>
      <Admincardscontent/>
      </ProtectedRoute>
    )
  }
]);

function Main() {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  );
}

export default Main;
