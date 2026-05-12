import React from "react";
import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Home from "./pages/Home";
import Breakfast from "./pages/Breakfast";
import Lunch from "./pages/Lunch";
import Dinner from "./pages/Dinner";
import Drinks from "./pages/Drinks";
import Desserts from "./pages/Desserts";

import FloatingCart
from "./components/FloatingCart";

import TableReservation
from "./pages/TableReservation";

import AdminLogin
from "./pages/AdminLogin";

import Dashboard
from "./pages/admin/Dashboard";

import ManageMenu
from "./pages/admin/ManageMenu";

import TabletSetup
from "./pages/TabletSetup";

import ManageOrders
from "./pages/admin/ManageOrders";

import OrderStatus
from "./pages/OrderStatus";

import ManageReservations
from "./pages/admin/ManageReservations";

import TableManagement
from "./pages/admin/TableManagement";

import About from "./pages/About";
import Feedback from "./pages/Feedback";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {

return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home />}
/>

<Route
path="/breakfast"
element={<Breakfast />}
/>

<Route
path="/lunch"
element={<Lunch />}
/>

<Route
path="/dinner"
element={<Dinner />}
/>

<Route
path="/drinks"
element={<Drinks />}
/>

<Route
path="/desserts"
element={<Desserts />}
/>

<Route
path="/reservation"
element={<TableReservation />}
/>

<Route
path="/admin"
element={<AdminLogin />}
/>

<Route
    path="/dashboard"
    element={
        <AdminProtectedRoute>
            <Dashboard />
        </AdminProtectedRoute>
    }
/>


<Route
    path="/manage-menu"
    element={
        <AdminProtectedRoute>
            <ManageMenu />
        </AdminProtectedRoute>
    }
/>


<Route
path="/tablet-setup"
element={<TabletSetup />}
/>

<Route
path="/manage-orders"
element={ <AdminProtectedRoute>
        <ManageOrders />
        </AdminProtectedRoute> }
/>

<Route
path="/order-status"
element={<OrderStatus />}
/>

<Route
path="/reservations"
element={<AdminProtectedRoute>
         <ManageReservations />
        </AdminProtectedRoute>}
/>

<Route
path="/table-management"
element={ <AdminProtectedRoute>
         <TableManagement />
        </AdminProtectedRoute> }
/>

<Route
path="/about"
element={<About />}
/>

<Route
path="/feedback"
element={<Feedback />}
/>

</Routes>

<FloatingCart />

</BrowserRouter>
);
}