import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    Search,
    Pencil,
    Trash2,
    Eye,
    EyeOff
} from "lucide-react";

import AdminLayout
from "../../layout/AdminLayout";

const API_BASE =
"https://restaurant-jagath.infinityfreeapp.com/restaurant-api";

export default function ManageMenu() {

    const [foods,
        setFoods] =
        useState([]);

    const [loading,
        setLoading] =
        useState(false);

    const [editId,
        setEditId] =
        useState(null);

    const [search,
        setSearch] =
        useState("");

    const [categoryFilter,
        setCategoryFilter] =
        useState("All");

    const [typeFilter,
        setTypeFilter] =
        useState("All");

    const [food,
        setFood] =
        useState({
            food_name: "",
            category: "",
            section: "",
            food_type: "",
            price: "",
            image: null,
            available: 1
        });

    const handleChange =
        (e) => {

            setFood({
                ...food,
                [e.target.name]:
                    e.target.value
            });
        };

    const handleImage =
        (e) => {

            setFood({
                ...food,
                image:
                    e.target.files[0]
            });
        };

    const fetchFoods =
        async () => {

            try {

                const response =
                    await fetch(
`${API_BASE}/menu/getFoods.php`
                    );

                const data =
                    await response.json();

                setFoods(
                    Array.isArray(data)
                    ? data
                    : []
                );

            } catch(error){

                console.log(
                    error
                );
            }
        };

    useEffect(() => {

        fetchFoods();

    }, []);

    const filteredFoods =
        useMemo(() => {

            return foods.filter(
                item => {

                    const searchMatch =
                        item.food_name
                        ?.toLowerCase()
                        .includes(
                            search
                            .toLowerCase()
                        );

                    const categoryMatch =
                        categoryFilter ===
                        "All"

                        ||

                        item.category ===
                        categoryFilter;

                    const typeMatch =
                        typeFilter ===
                        "All"

                        ||

                        item.food_type ===
                        typeFilter;

                    return (
                        searchMatch &&
                        categoryMatch &&
                        typeMatch
                    );
                }
            );

        }, [
            foods,
            search,
            categoryFilter,
            typeFilter
        ]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(
                    true
                );

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

                formData.append(
                    "available",
                    food.available
                );

                if(
                    food.image
                ){

                    formData.append(
                        "image",
                        food.image
                    );
                }

                let url =
`${API_BASE}/menu/addFood.php`;

                if(editId){

                    url =
`${API_BASE}/menu/updateFood.php`;

                    formData.append(
                        "id",
                        editId
                    );
                }

                const response =
                    await fetch(
                        url,
                        {
                            method:
                                "POST",
                            body:
                                formData
                        }
                    );

                const data =
                    await response.json();

                if(
                    data.success
                ){

                    alert(
                        editId
                        ? "Food Updated 🎉"
                        : "Food Added 🎉"
                    );

                    setFood({
                        food_name:"",
                        category:"",
                        section:"",
                        food_type:"",
                        price:"",
                        image:null,
                        available:1
                    });

                    setEditId(
                        null
                    );

                    fetchFoods();
                }

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
            const deleteFood =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete this food?"
                );

            if(
                !confirmDelete
            ) return;

            try {

                await fetch(
`${API_BASE}/menu/deleteFood.php?id=${id}`
                );

                alert(
                    "Food Deleted"
                );

                fetchFoods();

            } catch(error){

                console.log(
                    error
                );
            }
        };

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

                image:
                    null,

                available:
                    item.available
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

    const toggleAvailability =
        async (item) => {

            try {

                const formData =
                    new FormData();

                formData.append(
                    "id",
                    item.id
                );

                formData.append(
                    "food_name",
                    item.food_name
                );

                formData.append(
                    "category",
                    item.category
                );

                formData.append(
                    "section",
                    item.section
                );

                formData.append(
                    "food_type",
                    item.food_type
                );

                formData.append(
                    "price",
                    item.price
                );

                formData.append(
                    "available",

                    item.available ===
                    "1"

                    ? "0"
                    : "1"
                );

                await fetch(
`${API_BASE}/menu/updateFood.php`,
                    {
                        method:
                            "POST",
                        body:
                            formData
                    }
                );

                fetchFoods();

            } catch(error){

                console.log(
                    error
                );
            }
        };

    return (

        <AdminLayout>

            <div className="space-y-10">

                {/* Header */}
                <div>

                    <h1 className="text-white text-4xl md:text-6xl font-bold">

                        Manage Menu

                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">

                        Add and manage
                        restaurant foods

                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="grid md:grid-cols-2 gap-5 bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl"
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
                        className="bg-[#231b38] rounded-2xl p-5 text-white outline-none"
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
                        className="bg-[#231b38] rounded-2xl p-5 text-white outline-none"
                    />

                    <select
                        name="category"
                        value={
                            food.category
                        }
                        onChange={
                            handleChange
                        }
                        className="bg-[#231b38] rounded-2xl p-5 text-white"
                    >

                        <option value="">
                            Category
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
                        className="bg-[#231b38] rounded-2xl p-5 text-white"
                    >

                        <option value="">
                            Section
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
                        className="bg-[#231b38] rounded-2xl p-5 text-white"
                    >

                        <option value="">
                            Food Type
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
                        className="bg-[#231b38] rounded-2xl p-5 text-white"
                    />

                    <button
                        disabled={
                            loading
                        }
                        className="md:col-span-2 bg-gradient-to-r from-violet-600 to-purple-700 py-5 rounded-2xl text-white font-bold text-lg"
                    >

                        {
                            loading

                            ? "Processing..."

                            : editId

                            ? "Update Food"

                            : "Add Food"
                        }

                    </button>

                </form>
                                {/* Filters */}
                <div className="bg-white/5 border border-white/10 rounded-[35px] p-6 backdrop-blur-xl">

                    {/* Search */}
                    <div className="flex items-center bg-[#231b38] rounded-2xl px-5 py-4">

                        <Search
                            className="text-violet-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search food..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="bg-transparent outline-none text-white ml-4 w-full"
                        />

                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">

                        {[
                            "All",
                            "Breakfast",
                            "Lunch",
                            "Dinner",
                            "Drinks",
                            "Desserts"
                        ].map(item => (

                            <button
                                key={item}
                                onClick={() =>
                                    setCategoryFilter(
                                        item
                                    )
                                }
                                className={`px-5 py-3 rounded-2xl border duration-300
                                ${
                                    categoryFilter === item
                                    ? "bg-violet-600 border-violet-500 text-white"
                                    : "bg-white/5 border-white/10 text-gray-300"
                                }`}
                            >

                                {item}

                            </button>
                        ))}

                    </div>

                    {/* Veg Filter */}
                    <div className="flex gap-3 mt-5">

                        {[
                            "All",
                            "Veg",
                            "Non-Veg"
                        ].map(item => (

                            <button
                                key={item}
                                onClick={() =>
                                    setTypeFilter(
                                        item
                                    )
                                }
                                className={`px-5 py-3 rounded-2xl border duration-300
                                ${
                                    typeFilter === item
                                    ? "bg-violet-600 border-violet-500 text-white"
                                    : "bg-white/5 border-white/10 text-gray-300"
                                }`}
                            >

                                {item}

                            </button>
                        ))}

                    </div>

                </div>

                {/* Food Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {
                        filteredFoods.map(
                            (
                                item,
                                index
                            ) => (

                                <motion.div
                                    key={item.id}
                                    initial={{
                                        opacity: 0,
                                        y: 40
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay:
                                            index *
                                            0.05
                                    }}
                                    className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl hover:border-violet-500/30 duration-300"
                                >

                                    {/* Image */}
                                    <img
                                        src={
`${API_BASE}/uploads/images/${item.image}`
                                        }
                                        alt=""
                                        className="w-full h-60 object-cover"
                                    />

                                    {/* Content */}
                                    <div className="p-6">

                                        <div className="flex justify-between items-start">

                                            <div>

                                                <h2 className="text-white text-2xl font-bold capitalize">

                                                    {
                                                        item.food_name
                                                    }

                                                </h2>

                                                <p className="text-gray-400 mt-2">

                                                    {
                                                        item.category
                                                    }
                                                    {" • "}
                                                    {
                                                        item.section
                                                    }

                                                </p>

                                            </div>

                        <span
    className={`px-4 py-2 rounded-full text-sm font-semibold border
    ${
        item.food_type
        ?.toLowerCase()
        .replace("-", " ")
        .trim()
        === "veg"

        ? "bg-green-500/20 text-green-400 border-green-500/20"

        : "bg-red-500/20 text-red-400 border-red-500/20"
    }`}
>

    {
        item.food_type
        ?.toLowerCase()
        .replace("-", " ")
        .trim()
        === "veg"

        ? "🟢 Veg"

        : "🔴 Non-Veg"
    }

</span>

                                        </div>

                                        {/* Price */}
                                        <h3 className="text-violet-400 text-3xl font-bold mt-5">

                                            ₹{
                                                item.price
                                            }

                                        </h3>

                                        {/* Availability */}
                                        <div className="mt-5">

                                            <button
                                                onClick={() =>
                                                    toggleAvailability(
                                                        item
                                                    )
                                                }
                                                className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-medium duration-300
                                                ${
                                                    item.available === "1"

                                                    ? "bg-green-500/20 text-green-400"

                                                    : "bg-red-500/20 text-red-400"
                                                }`}
                                            >

                                                {
                                                    item.available === "1"

                                                    ? (
                                                        <>
                                                            <Eye
                                                                size={18}
                                                            />

                                                            Available
                                                        </>
                                                    )

                                                    : (
                                                        <>
                                                            <EyeOff
                                                                size={18}
                                                            />

                                                            Hidden
                                                        </>
                                                    )
                                                }

                                            </button>

                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3 mt-6">

                                            <button
                                                onClick={() =>
                                                    editFood(
                                                        item
                                                    )
                                                }
                                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
                                            >

                                                <Pencil
                                                    size={18}
                                                />

                                                Edit

                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteFood(
                                                        item.id
                                                    )
                                                }
                                                className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
                                            >

                                                <Trash2
                                                    size={18}
                                                />

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </motion.div>
                            )
                        )
                    }

                </div>

            </div>

        </AdminLayout>
    );
}