import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";

export default function ManageMenu() {

    const API_BASE =
        "https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

    const [food, setFood] = useState({
        food_name: "",
        category: "",
        section: "",
        food_type: "",
        price: "",
        image: null
    });

    const [foods, setFoods] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Input Change
    const handleChange = (e) => {

        setFood({
            ...food,
            [e.target.name]: e.target.value
        });
    };

    // Image Upload
    const handleImage = (e) => {

        setFood({
            ...food,
            image: e.target.files[0]
        });
    };

    // Fetch Foods
    const fetchFoods = async () => {

        try {

            const response = await fetch(
                `${API_BASE}/menu/getFoods.php`
            );

            const text = await response.text();

            console.log("Foods API:", text);

            let data = [];

            try {
                data = JSON.parse(text);
            } catch {

                console.log(
                    "Invalid JSON:",
                    text
                );

                alert(
                    "Backend returned invalid response"
                );

                return;
            }

            setFoods(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.log(
                "Fetch Error:",
                error
            );

            alert(
                "Failed to load menu"
            );
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // Submit Form
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !food.food_name ||
            !food.category ||
            !food.price
        ) {
            alert(
                "Please fill required fields"
            );
            return;
        }

        try {

            setLoading(true);

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

            if (food.image) {

                formData.append(
                    "image",
                    food.image
                );
            }

            const apiURL =
                editId
                    ? `${API_BASE}/menu/updateFood.php`
                    : `${API_BASE}/menu/addFood.php`;

            if (editId) {

                formData.append(
                    "id",
                    editId
                );
            }

            const response =
                await fetch(
                    apiURL,
                    {
                        method: "POST",
                        body: formData
                    }
                );

            const text =
                await response.text();

            console.log(
                "Submit API:",
                text
            );

            let data;

            try {

                data =
                    JSON.parse(text);

            } catch {

                alert(
                    "Backend Error:\n" +
                    text
                );

                return;
            }

            if (data.success) {

                alert(
                    editId
                        ? "Dish Updated Successfully 🎉"
                        : "Food Added Successfully 🎉"
                );

                setFood({
                    food_name: "",
                    category: "",
                    section: "",
                    food_type: "",
                    price: "",
                    image: null
                });

                setEditId(null);

                fetchFoods();

            } else {

                alert(
                    data.message ||
                    "Failed"
                );
            }

        } catch (error) {

            console.log(error);

            alert(
                "Server Error: " +
                error.message
            );

        } finally {

            setLoading(false);
        }
    };

    // Delete Food
    const deleteFood = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this food?"
            );

        if (!confirmDelete)
            return;

        try {

            await fetch(
                `${API_BASE}/menu/deleteFood.php?id=${id}`
            );

            alert(
                "Food Deleted"
            );

            fetchFoods();

        } catch (error) {

            console.log(error);

            alert(
                "Delete Failed"
            );
        }
    };

    // Edit Food
    const editFood = (item) => {

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
            behavior: "smooth"
        });
    };

    return (
        <AdminLayout>

            <div>

                <h1 className="text-white text-5xl font-bold">
                    Manage Menu
                </h1>

                <p className="text-gray-400 mt-3 text-lg">
                    Add food dishes for customers
                </p>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl"
                >

                    <input
                        type="text"
                        name="food_name"
                        placeholder="Food Name"
                        value={food.food_name}
                        onChange={handleChange}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={food.price}
                        onChange={handleChange}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white outline-none"
                    />

                    <select
                        name="category"
                        value={food.category}
                        onChange={handleChange}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Category
                        </option>
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Drinks</option>
                        <option>Desserts</option>
                    </select>

                    <select
                        name="section"
                        value={food.section}
                        onChange={handleChange}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Section
                        </option>
                        <option>Starter</option>
                        <option>Main Course</option>
                        <option>Side Dish</option>
                    </select>

                    <select
                        name="food_type"
                        value={food.food_type}
                        onChange={handleChange}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    >
                        <option value="">
                            Select Type
                        </option>
                        <option>Veg</option>
                        <option>Non-Veg</option>
                    </select>

                    <input
                        type="file"
                        onChange={handleImage}
                        className="bg-[#312B45] border border-white/10 rounded-2xl p-5 text-white"
                    />

                    <button
                        disabled={loading}
                        className="col-span-1 md:col-span-2 bg-violet-600 hover:bg-violet-700 py-5 rounded-2xl text-white text-xl font-bold duration-300"
                    >
                        {loading
                            ? "Processing..."
                            : editId
                                ? "Update Dish"
                                : "Add Dish"}
                    </button>

                </form>

                {/* FOOD LIST */}
                <div className="mt-16">

                    <h1 className="text-white text-4xl font-bold mb-8">
                        Food List
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {foods.map((item) => (

                            <div
                                key={item.id}
                                className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden shadow-2xl"
                            >

                                <img
                                    src={`${API_BASE}/uploads/images/${item.image}`}
                                    alt=""
                                    className="w-full h-56 object-cover"
                                />

                                <div className="p-6">

                                    <h2 className="text-white text-2xl font-bold">
                                        {item.food_name}
                                    </h2>

                                    <p className="text-gray-400 mt-2">
                                        {item.category} • {item.section}
                                    </p>

                                    <p className="text-violet-400 text-2xl font-bold mt-4">
                                        ₹{item.price}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}