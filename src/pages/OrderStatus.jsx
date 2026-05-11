import React,
{
useEffect,
useState
}
from "react";

import Navbar
from "../components/Navbar";

export default function OrderStatus() {

const [orders,
setOrders]
=
useState([]);

const [loading,
setLoading]
=
useState(true);

useEffect(() => {

fetchOrders();

const interval =
setInterval(
fetchOrders,
3000
);

return () =>
clearInterval(
interval
);

}, []);

const fetchOrders =
async () => {

const tableNumber =
localStorage.getItem(
"tableNumber"
);

if(!tableNumber){

setLoading(
false
);

return;
}

try {

const response =
await fetch(
`/api/orders/getCustomerOrderStatus.php?tableNumber=${tableNumber}`
);

const data =
await response.json();

setOrders(
data
);

} catch(error){

console.log(
error
);

} finally {

setLoading(
false
);
}
};

const getStatusColor =
(status)=>{

switch(status){

case "Pending":
return "text-yellow-400";

case "Preparing":
return "text-orange-400";

case "Completed":
return "text-green-400";

case "Cancelled":
return "text-red-400";

default:
return "text-white";
}
};

return (

<>

<Navbar />

<section className="min-h-screen bg-[#262235] px-5 py-20">

<div className="max-w-6xl mx-auto">

<h1 className="text-white text-6xl font-bold text-center">

🍽️ Order Tracking

</h1>

<p className="text-center text-violet-400 text-2xl mt-4">

Table {
localStorage.getItem(
"tableNumber"
)
}

</p>

{
loading ? (

<h2 className="text-center text-white text-3xl mt-20">

Loading...

</h2>

)

: orders.length === 0 ? (

<div className="text-center mt-20">

<h2 className="text-white text-4xl font-bold">

No Active Orders

</h2>

<p className="text-gray-400 mt-4">

Order food to track status

</p>

</div>

)

: (

<div className="space-y-10 mt-16">

{
orders.map(
order => (

<div
key={order.id}
className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl"
>

<div className="flex justify-between items-center mb-8">

<div>

<h2 className="text-white text-3xl font-bold">

Order #
{
order.id
}

</h2>

<p className="text-gray-400 mt-2">

{
order.created_at
}

</p>

</div>

<h2 className="text-violet-400 text-3xl font-bold">

₹{
order.total
}

</h2>

</div>

<div className="space-y-5">

{
order.items.map(
(item,index)=>(

<div
key={index}
className="bg-[#312B45] rounded-3xl p-5 border border-white/10"
>

<div className="flex justify-between items-center">

<div>

<h3 className="text-white text-2xl font-bold">

{
item.food_name
}

</h3>

<p className="text-gray-400 mt-2">

Qty:
{
item.quantity
}

</p>

</div>

<div className="text-right">

<h2 className="text-violet-400 text-xl font-bold">

₹
{
item.price *
item.quantity
}

</h2>

<p className={`font-bold text-lg mt-3 ${getStatusColor(item.status)}`}>

{
item.status
}

</p>

</div>

</div>

</div>
))
}

</div>

</div>
))
}

</div>
)
}

</div>

</section>

</>
);
}