import React, {
    useState,
    useEffect
} from "react";

import AdminLayout
from "../../layout/AdminLayout";

export default function ManageMenu() {

    const [food, setFood] =
        useState({
            food_name: "",
            category: "",
            section: "",
            food_type: "",
            price: "",
            image: null
        });

    const [foods, setFoods] =
        useState([]);

    const [editId, setEditId] =
        useState(null);

    // Input Change
    const handleChange =
        (e) => {

        setFood({
            ...food,
            [e.target.name]:
                e.target.value
        });
    };

    // Image Upload
    const handleImage =
        (e) => {

        setFood({
            ...food,
            image:
                e.target.files[0]
        });
    };

    // Fetch Foods
    const fetchFoods =
        async () => {

        const response =
            await fetch(
                "http://localhost/restaurant-api/menu/getFoods.php"
            );

        const data =
            await response.json();

        setFoods(data);
    };

    useEffect(() => {

        fetchFoods();

    }, []);

    // Submit Form
    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "food_name",
                food.food_name
            );

            formData.append(
                "category",
                food.category
            );

            formData.append(
                "section",
                food.section
            );

            formData.append(
                "food_type",
                food.food_type
            );

            formData.append(
                "price",
                food.price
            );

            if(food.image){

                formData.append(
                    "image",
                    food.image
                );
            }

            const apiURL =
                editId
                ? "http://localhost/restaurant-api/menu/updateFood.php"
                : "http://localhost/restaurant-api/menu/addFood.php";

            if(editId){

                formData.append(
                    "id",
                    editId
                );
            }

            const response =
                await fetch(
                    apiURL,
                    {
                        method:
                            "POST",
                        body:
                            formData
                    }
                );

            const data =
                await response.json();

            alert(
                data.message
            );

            fetchFoods();

            // Reset
            setFood({
                food_name: "",
                category: "",
                section: "",
                food_type: "",
                price: "",
                image: null
            });

            setEditId(null);

        } catch(error){

            console.log(error);

            alert(
                "Server Error"
            );
        }
    };

    // Delete Food
    const deleteFood =
        async (id) => {

        const confirmDelete =
            confirm(
                "Delete this food?"
            );

        if(!confirmDelete)
            return;

        await fetch(
            `http://localhost/restaurant-api/menu/deleteFood.php?id=${id}`
        );

        fetchFoods();
    };

    // Edit Food
    const editFood =
        (item) => {

        setFood({

            food_name:
                item.food_name,

            category:
                item.category,

            section:
                item.section,

            food_type:
                item.food_type,

            price:
                item.price,

            image: null
        });

        setEditId(
            item.id
        );

        window.scrollTo({
            top: 0,
            behavior:
                "smooth"
        });
    };

    return (

        <AdminLayout>

            <div>

                {/* Heading */}
                <h1 className="text-white text-6xl font-bold">

                    Manage Menu

                </h1>

                <p className="text-gray-400 mt-3 text-xl">

                    Add food dishes
                    for customers

                </p>

                {/* Form */}
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="grid grid-cols-2 gap-6 mt-12 bg-white/5 border border-white/10 rounded-[35px] p-10 backdrop-blur-xl"
                >

                    <input
                        type="text"
                        name="food_name"
                        placeholder="Food Name"
                        value={
                            food.food_name
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={
                            food.price
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    <select
                        name="category"
                        value={
                            food.category
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Category
                        </option>

                        <option>
                            Breakfast
                        </option>

                        <option>
                            Lunch
                        </option>

                        <option>
                            Dinner
                        </option>

                        <option>
                            Drinks
                        </option>

                        <option>
                            Desserts
                        </option>

                    </select>

                    <select
                        name="section"
                        value={
                            food.section
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Section
                        </option>

                        <option>
                            Starter
                        </option>

                        <option>
                            Main Course
                        </option>

                        <option>
                            Side Dish
                        </option>

                    </select>

                    <select
                        name="food_type"
                        value={
                            food.food_type
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Type
                        </option>

                        <option>
                            Veg
                        </option>

                        <option>
                            Non-Veg
                        </option>

                    </select>

                    <input
                        type="file"
                        onChange={
                            handleImage
                        }
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    />

                    <button
                        className="col-span-2 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-xl font-bold duration-300"
                    >
                        {
                            editId
                            ? "Update Dish"
                            : "Add Dish"
                        }
                    </button>

                </form>

                {/* Food List */}
                <div className="mt-16">

                    <h1 className="text-white text-4xl font-bold mb-8">

                        Food List

                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {
                            foods.map(
                                (item) => (

                                <div
                                    key={item.id}
                                    className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden shadow-2xl"
                                >

                                    <img
                                        src={`http://localhost/restaurant-api/uploads/images/${item.image}`}
                                        alt=""
                                        className="w-full h-56 object-cover"
                                    />

                                    <div className="p-6">

                                        <h2 className="text-white text-2xl font-bold">
                                            {item.food_name}
                                        </h2>

                                        <p className="text-gray-400 mt-2">
                                            {item.category}
                                            {" • "}
                                            {item.section}
                                        </p>

                                        <p className="text-violet-400 text-2xl font-bold mt-4">
                                            ₹{item.price}
                                        </p>

                                        <div className="flex gap-4 mt-6">

                                            <button
                                                onClick={() =>
                                                    editFood(item)
                                                }
                                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl text-white font-semibold"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteFood(item.id)
                                                }
                                                className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-semibold"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}