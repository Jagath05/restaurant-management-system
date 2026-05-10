

import breakfast1 from "../assets/food1.png"
import breakfast2 from "../assets/food2.png"
import lunch1 from "../assets/lunch.png"
import dinner1 from "../assets/dinner.png"

const foods = [

    // BREAKFAST

    {
        id: 1,
        meal: "Breakfast",
        section: "Main Course",
        name: "Idli",
        type: "Veg",
        price: 80,
        image: breakfast1,
        description: "Soft idli served with chutney and sambar."
    },

    {
        id: 2,
        meal: "Breakfast",
        section: "Main Course",
        name: "Egg Dosa",
        type: "Non-Veg",
        price: 140,
        image: breakfast2,
        description: "Special egg dosa with spicy masala."
    },

    {
        id: 3,
        meal: "Breakfast",
        section: "Side Dish",
        name: "Chutney",
        type: "Veg",
        price: 20,
        image: breakfast1,
        description: "Fresh coconut chutney."
    },

    // LUNCH

    {
        id: 4,
        meal: "Lunch",
        section: "Starter",
        name: "Chicken 65",
        type: "Non-Veg",
        price: 220,
        image: lunch1,
        description: "Spicy crispy chicken starter."
    },

    {
        id: 5,
        meal: "Lunch",
        section: "Main Course",
        name: "Chicken Biryani",
        type: "Non-Veg",
        price: 280,
        image: lunch1,
        description: "Aromatic chicken biryani."
    },

    {
        id: 6,
        meal: "Lunch",
        section: "Side Dish",
        name: "Chicken Gravy",
        type: "Non-Veg",
        price: 120,
        image: lunch1,
        description: "Delicious spicy chicken gravy."
    },

    // DINNER

    {
        id: 7,
        meal: "Dinner",
        section: "Starter",
        name: "Paneer Tikka",
        type: "Veg",
        price: 180,
        image: dinner1,
        description: "Grilled paneer starter."
    },

    {
        id: 8,
        meal: "Dinner",
        section: "Main Course",
        name: "Butter Chicken",
        type: "Non-Veg",
        price: 320,
        image: dinner1,
        description: "Creamy butter chicken curry."
    },

    {
        id: 9,
        meal: "Dinner",
        section: "Side Dish",
        name: "Garlic Naan",
        type: "Veg",
        price: 60,
        image: dinner1,
        description: "Fresh garlic naan bread."
    },


    // DRINKS

{
    id: 10,
    meal: "Drinks",
    section: "Drinks",
    name: "Fresh Lime Juice",
    type: "Veg",
    price: 90,
    image: dinner1,
    description: "Refreshing fresh lime juice."
},

{
    id: 11,
    meal: "Drinks",
    section: "Drinks",
    name: "Chocolate Milkshake",
    type: "Veg",
    price: 160,
    image: dinner1,
    description: "Rich chocolate milkshake."
},

// DESSERTS

{
    id: 12,
    meal: "Desserts",
    section: "Desserts",
    name: "Vanilla Ice Cream",
    type: "Veg",
    price: 120,
    image: dinner1,
    description: "Classic vanilla ice cream."
},

{
    id: 13,
    meal: "Desserts",
    section: "Desserts",
    name: "Brownie",
    type: "Veg",
    price: 180,
    image: dinner1,
    description: "Hot chocolate brownie."
}

]

export default foods