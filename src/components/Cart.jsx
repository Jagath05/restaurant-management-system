import React,
{
useContext,
useState
}
from "react";

import {
Trash2,
X
}
from "lucide-react";

import {
CartContext
}
from "../context/CartContext";

export default function Cart() {

const {
cart,
increaseQty,
decreaseQty,
subtotal,
tax,
total,
clearCart,
showCart,
setShowCart
}
=
useContext(
CartContext
);

const [payment,
setPayment]
=
useState("UPI");

const [loading,
setLoading]
=
useState(false);

if(!showCart)
return null;

const handleOrder =
async () => {

if(cart.length === 0){

alert(
"Cart is empty"
);

return;
}

const tableNumber =
localStorage.getItem(
"tableNumber"
);

if(!tableNumber){

alert(
"Tablet not assigned to table"
);

return;
}

setLoading(true);

const response =
await fetch(
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api/orders/placeOrder.php",
{
method: "POST",
headers: {
"Content-Type":
"application/json"
},
body:
JSON.stringify({

customer_name:
"Guest",

table_number:
tableNumber,

items:
cart,

subtotal,

tax,

total,

payment_method:
payment

})
}
);

const data =
await response.json();

setLoading(false);

if(data.success){

// SAVE ORDER ID
localStorage.setItem(
"latestOrderId",
data.order_id
);

alert(
`Order Placed Successfully 🎉

Order ID:
#${data.order_id}

Admin Notified`
);

clearCart();

setShowCart(false);

}else{

alert(
"Order Failed"
);
}
};

return (

<div className="fixed top-0 right-0 h-screen w-[450px] bg-[#262235] border-l border-white/10 z-[99999] shadow-2xl p-6 overflow-y-auto">

<div className="flex justify-between items-center mb-8">

<div>

<h2 className="text-white text-4xl font-bold">

Your Order

</h2>

<p className="text-gray-400">

{cart.length} items

</p>

</div>

<button
onClick={() =>
setShowCart(false)
}
className="text-white hover:text-red-400"
>

<X size={32} />

</button>

</div>

{
cart.length === 0

? (

<div className="text-center mt-20">

<h2 className="text-white text-3xl">

Empty Cart 🍽️

</h2>

<p className="text-gray-400 mt-3">

Add foods to continue

</p>

</div>

)

: (

<>

<div className="space-y-5">

{
cart.map(
item => (

<div
key={item.id}
className="bg-white/5 border border-white/10 rounded-3xl p-4"
>

<img
src={`https://restaurant-jagath.infinityfreeapp.com/restaurant-api/uploads/images/${item.image}`}
alt=""
className="w-full h-40 rounded-2xl object-cover"
/>

<div className="mt-4">

<div className="flex justify-between">

<h3 className="text-white text-xl font-bold">

{item.food_name}

</h3>

<Trash2
className="text-red-400 cursor-pointer"
onClick={() =>
decreaseQty(item.id)
}
/>

</div>

<p className="text-violet-400 mt-2">

₹{item.price}

</p>

<div className="flex items-center justify-between mt-5">

<div className="flex items-center gap-4">

<button
onClick={() =>
decreaseQty(item.id)
}
className="bg-red-500 w-10 h-10 rounded-full text-white"
>
-
</button>

<span className="text-white text-xl font-bold">

{item.quantity}

</span>

<button
onClick={() =>
increaseQty(item.id)
}
className="bg-green-500 w-10 h-10 rounded-full text-white"
>
+
</button>

</div>

<h2 className="text-white text-xl font-bold">

₹{
item.price *
item.quantity
}

</h2>

</div>

</div>

</div>
))
}

</div>

<div className="mt-8">

<label className="text-white text-lg">

Payment Method

</label>

<select
value={payment}
onChange={(e) =>
setPayment(
e.target.value
)
}
className="w-full mt-3 bg-[#312B45] border border-white/10 rounded-2xl p-4 text-white"
>

<option>
UPI
</option>

<option>
Card
</option>

<option>
Cash
</option>

<option>
Net Banking
</option>

</select>

</div>

<div className="mt-8 border-t border-white/10 pt-6">

<div className="flex justify-between text-gray-300 mb-3">

<span>
Subtotal
</span>

<span>
₹{
subtotal.toFixed(2)
}
</span>

</div>

<div className="flex justify-between text-gray-300 mb-3">

<span>
GST (5%)
</span>

<span>
₹{
tax.toFixed(2)
}
</span>

</div>

<div className="flex justify-between text-white text-3xl font-bold mt-6">

<span>
Total
</span>

<span>
₹{
total.toFixed(2)
}
</span>

</div>

<button
onClick={
handleOrder
}
disabled={
loading
}
className="w-full mt-8 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-xl font-bold"
>

{
loading
? "Placing Order..."
: "Proceed Order →"
}

</button>

</div>

</>
)
}

</div>
);
}