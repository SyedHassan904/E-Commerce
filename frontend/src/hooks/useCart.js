import { useContext, useCallback } from "react";
import shopContext from "../context/shopContext.js";
import axios from "axios";
import { toast } from "react-toastify";

export const useCart = () => {
    const {
        backendURL,
        userAllCartItems,
        setUserAllCartItems,
        setCartQuantity,
        setTotalPrice,
        setTotalDiscount,
        setTotalAmount,
        token
    } = useContext(shopContext);

    // Calculate totals from cart items
    const calculateTotals = useCallback((cartData = []) => {
        let totalQuantity = 0;
        let totalOriginalPrice = 0;
        let totalDiscountAmount = 0;

        cartData.forEach((item) => {
            const qty = item.quantity || 0;
            const originalPrice = item.cartProducts?.price || 0;
            const discountPrice = item.cartProducts?.discountPrice || originalPrice;

            totalQuantity += qty;
            totalOriginalPrice += originalPrice * qty;
            totalDiscountAmount += (originalPrice - discountPrice) * qty;
        });

        const totalPayable = totalOriginalPrice - totalDiscountAmount;

        return {
            quantity: totalQuantity,
            price: Math.round(totalOriginalPrice * 100) / 100,
            discount: Math.round(totalDiscountAmount * 100) / 100,
            total: Math.round(totalPayable * 100) / 100
        };
    }, []);

    // Update global state with cart totals
    const updateCartState = useCallback((cartData) => {
        const totals = calculateTotals(cartData);
        
        setUserAllCartItems(cartData);
        setCartQuantity(totals.quantity);
        setTotalPrice(totals.price);
        setTotalDiscount(totals.discount);
        setTotalAmount(totals.total);
        
        // Notify other components of cart update
        window.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { cartData, totals } 
        }));
    }, [setUserAllCartItems, setCartQuantity, setTotalPrice, setTotalDiscount, setTotalAmount, calculateTotals]);

    // Add to cart with optimistic update
    const addToCart = useCallback(async (productId, size, quantity = 1) => {
        if (!token) {
            toast.error("Please login to add items to cart");
            return false;
        }

        if (!size) {
            toast.error("Please select a size");
            return false;
        }

        try {
            const payload = { productId, size, quantity };
            const response = await axios.post(`${backendURL}/api/cart/addToCart`, payload, {
                headers: { token }
            });

            if (response.data.success) {
                const cartData = response.data.findedUserCartData?.cartData || [];
                updateCartState(cartData);
                return true;
            } else {
                toast.error(response.data.message);
                return false;
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error(error.response?.data?.message || "Failed to add item to cart");
            return false;
        }
    }, [backendURL, token, updateCartState]);

    // Update cart quantity
    const updateCart = useCallback(async (productId, size, quantity) => {
        console.log(productId, size, quantity);
        if (!token) {
            toast.error("Please login to update cart");
            return false;
        }
        
        try {
            // Optimistic update
            const optimisticCart = userAllCartItems.map(item =>
                item?.cartProducts?._id === productId && item?.size === size
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            );
            updateCartState(optimisticCart);

            const payload = { productId, size, quantity };
            const response = await axios.post(`${backendURL}/api/cart/update`, payload, {
                headers: { token }
            });

            if (!response.data.success) {
                // Revert on error
                toast.error(response.data.message);
                // Refetch actual cart state
                const refreshResponse = await axios.post(`${backendURL}/api/cart/all`, {}, {
                    headers: { token }
                });
                if (refreshResponse.data.success) {
                    updateCartState(refreshResponse.data.findedUserCartData?.cartData || []);
                }
                return false;
            }
            
            return true;
        } catch (error) {
            console.error("Update cart error:", error);
            toast.error("Failed to update cart");
            // Refetch actual cart state on error
            try {
                const refreshResponse = await axios.post(`${backendURL}/api/cart/all`, {}, {
                    headers: { token }
                });
                if (refreshResponse.data.success) {
                    updateCartState(refreshResponse.data.findedUserCartData?.cartData || []);
                }
            } catch (err) {
                console.error("Error refreshing cart:", err);
            }
            return false;
        }
    }, [backendURL, token, userAllCartItems, updateCartState]);
    
    // Remove from cart
    const removeFromCart = useCallback(async (productId, size) => {
        console.log(productId, size);
        if (!token) {
            toast.error("Please login to remove items");
            return false;
        }

        try {
            // Optimistic update - remove item immediately
            const optimisticCart = userAllCartItems.filter(
                item => !(item?.cartProducts?._id === productId && item?.size === size)
            );
            updateCartState(optimisticCart);

            const payload = { productId, size };
            const response = await axios.post(`${backendURL}/api/cart/delete`, payload, {
                headers: { token }
            });

            if (!response.data.success) {
                toast.error(response.data.message);
                // Refetch actual cart state on error
                const refreshResponse = await axios.post(`${backendURL}/api/cart/all`, {}, {
                    headers: { token }
                });
                if (refreshResponse.data.success) {
                    updateCartState(refreshResponse.data.findedUserCartData?.cartData || []);
                }
                return false;
            }

            toast.success("Item removed from cart");
            return true;
        } catch (error) {
            console.error("Remove from cart error:", error);
            toast.error("Failed to remove item");
            // Refetch actual cart state on error
            try {
                const refreshResponse = await axios.post(`${backendURL}/api/cart/all`, {}, {
                    headers: { token }
                });
                if (refreshResponse.data.success) {
                    updateCartState(refreshResponse.data.findedUserCartData?.cartData || []);
                }
            } catch (err) {
                console.error("Error refreshing cart:", err);
            }
            return false;
        }
    }, [backendURL, token, userAllCartItems, updateCartState]);

    // Fetch cart data
    const fetchCart = useCallback(async () => {
        if (!token) {
            return;
        }

        try {
            const response = await axios.post(
                `${backendURL}/api/cart/all`,
                {},
                { headers: { "token": token } }
            );
            if (response.data.success) {
                const cartData = response?.data?.findedUserCartData?.cartData || [];
                setUserAllCartItems(cartData);

                const totals = calculateTotals(cartData);
                setCartQuantity(totals.quantity);
                setTotalPrice(totals.price);
                setTotalDiscount(totals.discount);
                setTotalAmount(totals.total);
            }
        } catch (error) {
            console.log("Cart fetch error:", error);
        } 
    }, [backendURL, token, updateCartState]);

    return {
        addToCart,
        updateCart,
        removeFromCart,
        fetchCart,
        calculateTotals,
        cartItems: userAllCartItems,
        cartCount: userAllCartItems.length,
        cartTotal: calculateTotals(userAllCartItems).total
    };
};