import React,
{
useEffect,
useState
}
from "react";

export default function ManageOrders() {

const [orders,
setOrders]
=
useState([]);

useEffect(() => {

fetchOrders();

}, []);

const fetchOrders =
async () => {

const response =
await fetch(
"/api/orders/getOrders.php"
);

const data =
await response.json();

setOrders(data);
};

const updateFoodStatus =
async (
orderId,
itemIndex,
status
) => {

await fetch(
"/api/orders/updateOrderStatus.php",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify({
orderId,
itemIndex,
status
})
}
);

fetchOrders();
};

const getColor =
(status)=>{

switch(status){

case "Pending":
return "bg-yellow-500";

case "Preparing":
return "bg-orange-500";

case "Completed":
return "bg-green-600";

case "Cancelled":
return "bg-red-600";

default:
return "bg-gray-600";
}
};

return (

<section className="min-h-screen bg-[#262235] p-10">

<h1 className="text-white text-6xl font-bold mb-10">

Manage Orders

</h1>

<div className="space-y-8">

{
orders.map(
order => (

<div
key={order.id}
className="bg-white/5 border border-white/10 rounded-[30px] p-8"
>

<h2 className="text-white text-3xl font-bold">

Table {
order.table_number
}

</h2>

<p className="text-gray-400 mt-2">

Payment:
{order.payment_method}

</p>

<div className="mt-8 space-y-6">

{
order.items.map(
(item,index)=>(

<div
key={index}
className="bg-[#312B45] rounded-3xl p-6"
>

<div className="flex justify-between">

<div>

<h3 className="text-white text-2xl font-bold">

{
item.food_name
}

x
{
item.quantity
}

</h3>

<p className="text-violet-400 mt-2">

₹
{
item.price *
item.quantity
}

</p>

</div>

<span className={`${getColor(item.status)} px-4 py-2 rounded-xl text-white h-fit`}>

{
item.status
}

</span>

</div>

<div className="flex gap-3 mt-5 flex-wrap">

<button
onClick={() =>
updateFoodStatus(
order.id,
index,
"Preparing"
)
}
className="bg-yellow-500 px-4 py-2 rounded-xl text-white"
>
Preparing
</button>

<button
onClick={() =>
updateFoodStatus(
order.id,
index,
"Completed"
)
}
className="bg-green-600 px-4 py-2 rounded-xl text-white"
>
Completed
</button>

<button
onClick={() =>
updateFoodStatus(
order.id,
index,
"Cancelled"
)
}
className="bg-red-600 px-4 py-2 rounded-xl text-white"
>
Cancel
</button>

</div>

</div>
))
}

</div>

<div className="border-t border-white/10 mt-8 pt-6 flex justify-between text-white text-2xl font-bold">

<span>
Total
</span>

<span>
₹{
order.total
}
</span>

</div>

</div>
))
}

</div>

</section>
);
}