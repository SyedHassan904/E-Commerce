import "./addProduct.css"
import adminContext from "../../context/adminContext.js"
import React, { useState, useContext, useEffect } from "react"
import { Select, TextField, FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify"
import axios from "axios"
export default function AddProduct() {
    const { backendURL } = useContext(adminContext);
    
    // Debug: Log backend URL on component mount
    useEffect(() => {
        console.log("Backend URL:", backendURL);
    }, [backendURL]);
    let [imageUrl, setImageUrl] = useState("");
    let [brand, setBrand] = useState("");
    let [title, setTitle] = useState("");
    let [color, setColor] = useState("");
    let [quantity, setQuantity] = useState(null);
    let [price, setPrice] = useState(null);
    let [discountPrice, setDiscountPrice] = useState(null);
    let [discountPercentage, setDiscountPercentage] = useState(null);
    let [description, setDescription] = useState("");
    let [topLevelCategory, setTopLevelCategory] = useState("");
    let [secondLevelCategory, setSecondLevelCategory] = useState("");
    let [thirdLevelCategory, setThirdLevelCategory] = useState("");
    let [size, setSize] = useState([
        {
            sizeName: "",
            sizeQuantity: null,
        },
        {
            sizeName: "",
            sizeQuantity: null,
        },
        {
            sizeName: "",
            sizeQuantity: null,
        },
    ]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        
        // Debug: Log all form values
        console.log("Form values:", {
            imageUrl,
            brand,
            title,
            color,
            quantity,
            price,
            discountPrice,
            discountPercentage,
            topLevelCategory,
            secondLevelCategory,
            thirdLevelCategory,
            description,
            size
        });
        
        // Validation - check for empty strings and null/undefined values
        const missingFields = [];
        if (!imageUrl || !imageUrl.trim()) missingFields.push("Image URL");
        if (!brand || !brand.trim()) missingFields.push("Brand");
        if (!title || !title.trim()) missingFields.push("Title");
        if (!color || !color.trim()) missingFields.push("Color");
        if (!quantity || quantity === "") missingFields.push("Quantity");
        if (!price || price === "") missingFields.push("Price");
        if (!discountPrice || discountPrice === "") missingFields.push("Discount Price");
        if (!discountPercentage || discountPercentage === "") missingFields.push("Discount Percentage");
        if (!topLevelCategory || topLevelCategory === "") missingFields.push("Top Level Category");
        if (!secondLevelCategory || secondLevelCategory === "") missingFields.push("Second Level Category");
        if (!thirdLevelCategory || thirdLevelCategory === "") missingFields.push("Third Level Category");
        if (!description || !description.trim()) missingFields.push("Description");
        
        if (missingFields.length > 0) {
            toast.error(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }

        // Validate size array
        const validSizes = size.filter(sizeItem => sizeItem.sizeName && sizeItem.sizeName.trim() && sizeItem.sizeQuantity && sizeItem.sizeQuantity !== "");
        if (validSizes.length === 0) {
            toast.error("At least one size with quantity is required");
            return;
        }

        try {
            let payload = {
                imageUrl,
                brand,
                title,
                color,
                quantity: parseInt(quantity),
                price: parseInt(price),
                discountPrice: parseInt(discountPrice),
                discountPercentage: parseInt(discountPercentage),
                description,
                size: validSizes,
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
            }
            
            console.log("Sending payload:", payload);
            console.log("Backend URL:", backendURL);
            
            let response = await axios.post(`${backendURL}/api/product/create`, payload);
            if (response.data.success) {
                toast.success(response.data.message);
                // Reset form
                setImageUrl("");
                setBrand("");
                setTitle("");
                setColor("");
                setQuantity(null);
                setPrice(null);
                setDiscountPrice(null);
                setDiscountPercentage(null);
                setDescription("");
                setTopLevelCategory("");
                setSecondLevelCategory("");
                setThirdLevelCategory("");
                setSize([
                    { sizeName: "", sizeQuantity: null },
                    { sizeName: "", sizeQuantity: null },
                    { sizeName: "", sizeQuantity: null },
                ]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error details:", error);
            if (error.response) {
                // Server responded with error status
                toast.error(error.response.data.message || "Server error occurred");
            } else if (error.request) {
                // Request was made but no response received
                toast.error("Unable to connect to server. Please check your connection.");
            } else {
                // Something else happened
                toast.error("An unexpected error occurred");
            }
        }
    }


    const handleSize = (event, index) => {
        let { name, value } = event.target;
        let updatedSizes = [...size];
    
        if (name === "sizeQuantity") {
            const numericValue = Number(value);
            updatedSizes[index][name] = numericValue === 0 ? null : numericValue;
        } else {
            updatedSizes[index][name] = value;
        }
    
        setSize(updatedSizes);
    };
    

    useEffect(() => {
        console.log(size);
    }, [size]);

    return (
        <>
            <div className="addProductPage">
                <h1>Add New Product</h1>
                <form onSubmit={(e) => handleAddProduct(e)} id="addProductForm">
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                    />

                    <div className="addProducInptFieldDiv">
                        <TextField
                            label="Brand"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                        />
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="addProducInptFieldDiv">
                        <TextField
                            label="Color"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setColor(e.target.value)}
                            value={color}
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            type="number"
                        />
                    </div>
                    <div className="addProductThreeFieldsDiv">
                        <TextField
                            label="Price"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <TextField
                            label="Discount Price"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            value={discountPrice}
                        />
                        <TextField
                            label="Discount Percentage"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            value={discountPercentage}
                        />
                    </div>
                    <div className="addProductSelectFieldDiv">
                        <FormControl fullWidth>
                            <InputLabel id="tier-category-label">Top Level Category</InputLabel>
                            <Select
                                labelId="tier-category-label"
                                label="Top Level Category"
                                value={topLevelCategory}
                                onChange={(e) => setTopLevelCategory(e.target.value)}
                            >
                                <MenuItem value="men">Men</MenuItem>
                                <MenuItem value="women">Women</MenuItem>
                                <MenuItem value="kids">Kids</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="secLevelCatLab">Second Level Category</InputLabel>
                            <Select
                                labelId="secLevelCatLab"
                                value={secondLevelCategory}
                                onChange={(e) => setSecondLevelCategory(e.target.value)}
                                displayEmpty
                                label="Second Level Category"
                                inputProps={{ 'aria-label': 'Order status filter' }}
                                sx={{
                                    minWidth: 180,
                                    backgroundColor: 'background.paper',
                                    borderRadius: 1,
                                    '& .MuiSelect-select': {
                                        padding: '8px 12px'
                                    }
                                }}
                            >
                                <MenuItem value="clothing">Clothing</MenuItem>
                                <MenuItem value="accessories">Accessories</MenuItem>
                                <MenuItem value="brands">Brands</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="thirdLevelCatLabel">Third Level Category</InputLabel>
                            <Select
                                labelId="thirdLevelCatLabel"
                                value={thirdLevelCategory}
                                onChange={(e) => setThirdLevelCategory(e.target.value)}
                                label="Third level Category"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Order status filter' }}
                                sx={{
                                    minWidth: 180,
                                    backgroundColor: 'background.paper',
                                    borderRadius: 1,
                                    '& .MuiSelect-select': {
                                        padding: '8px 12px'
                                    }
                                }}
                            >
                                <MenuItem value="tops">Tops</MenuItem>
                                <MenuItem value="dresses">Dresses</MenuItem>
                                <MenuItem value="tShirts">T-Shirts</MenuItem>
                                <MenuItem value="sarees">Saree</MenuItem>
                                <MenuItem value="lenghaCholi">Lengha Choli</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {
                        size.map((sizeItem, index) =>
                            <div key={index} className="addProducInptFieldDiv">
                                <TextField
                                    label="Size Name *"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleSize(e, index)}
                                    value={sizeItem.sizeName}
                                    name="sizeName"
                                />
                                <TextField
                                    label="Quantity *"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleSize(e, index)}
                                    value={sizeItem.sizeQuantity}
                                    name="sizeQuantity"
                                />
                            </div>
                        )
                    }
                    <button type="submit" className="addNewBtn">Add New Product</button>
                </form >
            </div >
        </>
    )
}