import React,
{
useEffect,
useState
}
from "react";

import AdminLayout
from "../../layout/AdminLayout";

export default function TableManagement() {

const [tables,
setTables]
=
useState([]);

useEffect(() => {

fetchTables();

}, []);

const fetchTables =
async () => {

const response =
await fetch(
"http://localhost/restaurant-api/tables/getTables.php"
);

const data =
await response.json();

setTables(
data
);
};

const updateStatus =
async (
id,
status
) => {

await fetch(
"http://localhost/restaurant-api/tables/updateTableStatus.php",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify({
id,
status
})
}
);

fetchTables();
};

const getColor =
(status)=>{

switch(status){

case "Available":
return "bg-green-500";

case "Reserved":
return "bg-yellow-500";

case "Occupied":
return "bg-red-500";

case "Maintenance":
return "bg-gray-600";

default:
return "bg-white";
}
};

return (

<AdminLayout>

<section>

<h1 className="text-white text-6xl font-bold mb-10">

Table Management

</h1>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

{
tables.map(
(table)=> (

<div
key={table.id}
className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-xl"
>

<div className="flex justify-between items-center">

<div>

<h2 className="text-white text-4xl font-bold">

Table {
table.table_number
}

</h2>

<p className="text-gray-400 mt-2">

Capacity:
{
table.capacity
}

</p>

</div>

<div className={`${getColor(table.status)} px-5 py-3 rounded-2xl text-white font-bold`}>

{
table.status
}

</div>

</div>

<div className="grid grid-cols-2 gap-3 mt-8">

<button
onClick={() =>
updateStatus(
table.id,
"Available"
)
}
className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl"
>
Available
</button>

<button
onClick={() =>
updateStatus(
table.id,
"Reserved"
)
}
className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl"
>
Reserved
</button>

<button
onClick={() =>
updateStatus(
table.id,
"Occupied"
)
}
className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl"
>
Occupied
</button>

<button
onClick={() =>
updateStatus(
table.id,
"Maintenance"
)
}
className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-2xl"
>
Maintenance
</button>

</div>

</div>
))
}

</div>

</section>

</AdminLayout>
);
}