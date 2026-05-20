import React, {
    createContext,
    useState
} from "react";

export const CartContext =
    createContext();

export default function CartProvider({
    children
}) {

    const [cart,
        setCart] =
        useState([]);

    const [showCart,
        setShowCart] =
        useState(false);

    // NEW:
    // Only auto-open once
    const [cartOpenedOnce,
        setCartOpenedOnce] =
        useState(false);

    // Add To Cart
    const addToCart =
        (food) => {

            const existing =
                cart.find(
                    item =>
                        item.id ===
                        food.id
                );

            if (existing) {

                const updatedCart =
                    cart.map(
                        item =>
                            item.id ===
                            food.id
                                ? {
                                    ...item,
                                    quantity:
                                        item.quantity + 1
                                }
                                : item
                    );

                setCart(
                    updatedCart
                );

            } else {

                setCart([
                    ...cart,
                    {
                        ...food,
                        quantity: 1
                    }
                ]);
            }

            // Auto-open ONLY first time
            if(
                !cartOpenedOnce
            ){

                setShowCart(
                    true
                );

                setCartOpenedOnce(
                    true
                );
            }
        };

    // Increase Quantity
    const increaseQty =
        (id) => {

            setCart(
                cart.map(
                    item =>
                        item.id === id
                            ? {
                                ...item,
                                quantity:
                                    item.quantity + 1
                            }
                            : item
                )
            );
        };

    // Decrease Quantity
    const decreaseQty =
        (id) => {

            setCart(
                cart
                    .map(
                        item =>
                            item.id === id
                                ? {
                                    ...item,
                                    quantity:
                                        item.quantity - 1
                                }
                                : item
                    )
                    .filter(
                        item =>
                            item.quantity > 0
                    )
            );
        };

    // Clear Cart
    const clearCart =
        () => {

            setCart([]);

            // Reset auto-open
            setCartOpenedOnce(
                false
            );

            setShowCart(
                false
            );
        };

    // Totals
    const subtotal =
        cart.reduce(
            (acc, item) =>
                acc +
                item.price *
                item.quantity,
            0
        );

    const tax =
        subtotal * 0.05;

    const total =
        subtotal + tax;

    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                clearCart,
                subtotal,
                tax,
                total,
                showCart,
                setShowCart
            }}
        >

            {children}

        </CartContext.Provider>
    );
}