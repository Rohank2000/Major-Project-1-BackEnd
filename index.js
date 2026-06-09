const express = require("express");

const app = express();

const { databaseConnection } = require("./db/db.connect");

databaseConnection();

const addressModel = require("./models/Address.model");
const clothingModel = require("./models/Clothing.model");
const userModel = require("./models/User.model");
const categoryModel = require("./models/Category.model");

app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//function to Add New address Data to Database using Mongoose

const addingAddressDataToDatabase = async (addressData) => {
  try {
    const newaddressToDatabase = new addressModel(addressData);
    const saveNewAddressData = await newaddressToDatabase.save();
    return saveNewAddressData;
  } catch (error) {
    console.log("Error Occured While Seeding to Database", error);
  }
};

//using Above Mongoose function with Express 'POST' Route to Add New address Data to Database

app.post("/api/addresses", async (req, res) => {
  try {
    const newAddress = await addingAddressDataToDatabase(req.body);
    res.status(201).json({
      message: "New Address Added to the Database.",
      data: { address: newAddress },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Function to Update address Data to Database using Mongoose

const updateAddressDataToDatabase = async (addressId, updatedData) => {
  try {
    const updateAddressData = await addressModel.findByIdAndUpdate(
      addressId,
      updatedData,
      
  { returnDocument: 'after' }
    );
    return updateAddressData;
  } catch (error) {
    console.log("Error Occured While Updating Address Data To Database", error);
  }
};

//using Above Mongoose function with Express 'POST' Route to Update address Data to Database

app.post("/api/addresses/:addressId", async (req, res) => {
  try {
    const addressData = await updateAddressDataToDatabase(
      req.params.addressId,
      req.body
    );
    res.status(200).json({
      message: "Address Updated Successfully",
      data: { address: addressData },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Delete address Data from Database using Mongoose

const deleteAddressFromDatabase = async (addressId) => {
  try {
    const deleteAddress = await addressModel.findByIdAndDelete(addressId);
    return deleteAddress;
  } catch (error) {
    console.log(
      "Error Occured While Deleting Address From the Database",
      error
    );
  }
};

//using Above Mongoose function with Express 'DELETE' Route to Delete address Data from Database

app.delete("/api/remove/addresses", async (req, res) => {
  try {
    const saveDeletedAddressInfo = await deleteAddressFromDatabase(req.body);
    res.status(200).json({
      message: "Address Deleted SuccessFully",
      data: { address: saveDeletedAddressInfo },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch address Data from the Database using Mongoose

const getAddressDataFromDatabase = async () => {
  try {
    const getAddressData = await addressModel.find();
    return getAddressData;
  } catch (error) {
    console.log("Occur Occured While Fetching Address Data", error);
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch address Data from the Database

app.get("/api/fetch/addresses", async (req, res) => {
  try {
    const getAddress = await getAddressDataFromDatabase();
    if (!getAddress) {
      res.status(404).json({ message: "Address Data Not Found." });
    } else {
      res.status(200).json({
        message: "Fetched All Addresses From Database Successfully.",
        data: { address: getAddress },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Clothing Data to Database using Mongoose

const addingClothingDataToDatabase = async (product) => {
  try {
    const newClothingDataToDatabase = new clothingModel(product);
    const savedClothingData = await newClothingDataToDatabase.save();
    return savedClothingData;
  } catch (error) {
    console.log(
      "Error Occured While Uploading New Clothes to Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'POST' Route to Add New Clothings Data to Database

app.post("/api/Clothing", async (req, res) => {
  try {
    const newClothingData = await addingClothingDataToDatabase(req.body);
    res.status(201).json({
      message: "New Clothing Data to the Database.",
      data: { clothing: newClothingData },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch Clothing Data from the Database using Mongoose

const getClothingDataFromTheDatabase = async () => {
  try {
    const getClothingData = await clothingModel.find();
    return getClothingData;
  } catch (error) {
    console.log(
      "Error Occured While Fetching Clothing Data from the Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch Clothing Data from the Database

app.get("/api/fetch/Clothing", async (req, res) => {
  try {
    const clothingData = await getClothingDataFromTheDatabase();
    if (!clothingData) {
      res.status(404).json({ message: "Clothing Data Not Found." });
    } else {
      res.status(200).json({
        message: "Fetched All Clothing Data From Database Successfully.",
        data: { clothing: clothingData },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch Clothing Data using Id from the Database using Mongoose

const getClothingDataUsingId = async (clothingId) => {
  try {
    const getClothingData = await clothingModel.findById(clothingId);
    return getClothingData;
  } catch (error) {
    console.log(
      "Error Occured While Fetching Clothing Data using Id From the Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch Clothing Data using Id from the Database

app.get("/api/Clothing/:clothingId", async (req, res) => {
  try {
    const clothingData = await getClothingDataUsingId(req.params.clothingId);
    if (!clothingData) {
      res
        .status(404)
        .json({ message: "This Specific Clothing Data Not Found." });
    } else {
      res.status(200).json({
        message: "Fetched All Clothing Data Using Id From the Database.",
        data: { clothing: clothingData },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Add Categories Data to Database using Mongoose

const addingCategoriesInDatabase = async (categoryData) => {
  try {
    const addingCategories = new categoryModel(categoryData);
    const savedAddingCategories = await addingCategories.save();
    return savedAddingCategories;
  } catch (error) {
    console.log(
      "Error Occured While Adding New Category Data into the Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'POST' Route to Add Categories Data to Database

app.post("/api/categories", async (req, res) => {
  try {
    const categoryData = await addingCategoriesInDatabase(req.body);
    res.status(201).json({
      message: "Successfully Added Category Data in the Database.",
      data: { category: categoryData },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch Categories Data from the Database using Mongoose

const getCategoriesDataFromtheDatabase = async () => {
  try {
    const getCategoriesData = await categoryModel.find();
    return getCategoriesData;
  } catch (error) {
    console.log(
      "Error Occured While Fetching Category Data from the Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch Category Data from the Database

app.get("/api/fetch/categories", async (req, res) => {
  try {
    const categoryData = await getCategoriesDataFromtheDatabase();
    if (!categoryData) {
      res.status(404).json({ message: "Category Data Not Found." });
    } else {
      res.status(200).json({
        message: "Fetched All Category from the Database.",
        data: { category: categoryData },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Update WishList Data to Database using Mongoose

const updateWishlistDataInDatabase = async (wishListData) => {
  try {
    const { userId, wishlistArray } = wishListData;
    const updateWishlistData = await userModel.findOneAndUpdate(
      { userId: userId },
      { wishlist: wishlistArray },
  { returnDocument: 'after' }    );
    return updateWishlistData;
  } catch (error) {
    console.log(
      "Error Occured While Updating WishList Data in the Database",
      error
    );
  }
};

//using Above Mongoose function with Express 'POST' Route to Update WishList Data to Database

app.post("/api/wishlist", async (req, res) => {
  try {
    const wishListUpdate = await updateWishlistDataInDatabase(req.body);
    res.status(200).json({
      message: "Item Added to WishList",
      data: { wishList: wishListUpdate.wishlist },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch wishlist Data from the Database using Mongoose

const getWishlistDatafromDatabase = async () => {
  try {
    const getWishlistData = await userModel.find().select("wishlist");
    return getWishlistData;
  } catch (error) {
    console.log(
      "Error Occured While fetching wishlist Data from the Database using Mongoose",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch wishlist Data from the Database

app.get("/api/fetch/wishlist", async (req, res) => {
  try {
    const wishlistData = await getWishlistDatafromDatabase();
    if (!wishlistData) {
      res.status(404).json({ message: "Wishlist Data not Found." });
    } else {
      res.status(200).json({
        message: "wishlist Data Successfully Fetched from the Database.",
        data: { wishList: wishlistData },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Update Cart Items in Database using Mongoose

const updateCartItemInDatabase = async (cartInput) => {
  try {
    const { userId, cartArray } = cartInput;
    const updateCartItem = await userModel.findOneAndUpdate(
      { userId: userId },
      { cart: cartArray },
  { returnDocument: 'after' }    );
    return updateCartItem;
  } catch (error) {
    console.log("Error Occure While Updating Cart Items", error);
  }
};

//using Above Mongoose function with Express 'POST' Route to Update Cart Items in Database

app.post("/api/cart", async (req, res) => {
  try {
    const cartItem = await updateCartItemInDatabase(req.body);
    res
      .status(200)
      .json({ message: "Cart updated.", data: { cart: cartItem.cart } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch Cart Data from the Database using Mongoose

const getCartDataFromTheDatabase = async (cartGetInput) => {
  try {
    const {userId} = cartGetInput;
    const getCartData = await userModel.findOne({userId: userId}).select("cart userId");
    return getCartData;
  } catch (error) {
    console.log(
      "Error Occured While fetching Cart Data from the Database using Mongoose",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch Cart Data from the Database

app.get("/api/fetch/cart", async (req, res) => {
  try {
    const cartData = await getCartDataFromTheDatabase(req.query);
    if (!cartData) {
      res.status(404).json({ message: "Cart Data Not Found." });
    } else {
      res.status(200).json({
      message: "Cart Data Successfully Fetched from the Database.",
      data: { cart: cartData },
    });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Update Order Section in Database using Mongoose

const createOrderInDatabase = async (Input) => {
  try {
    const { userId, cartItems, totalPrice, chosenAddress } = Input;

    const newOrder = {
      item: cartItems,
      totalAmount: totalPrice,
      shippingAddress: chosenAddress,
    };

    const createOrder = await userModel.findOneAndUpdate(
      { userId: userId },
      {
        $push: { orders: newOrder },
        $set: { cart: [] },
      },

  { returnDocument: 'after' }    );
  } catch (error) {
    console.log(
      "Error Occured While Updating Order Section in Database.",
      error
    );
  }
};

//using Above Mongoose function with Express 'POST' Route to Update Order Section in Database

app.post("/api/orders", async (req, res) => {
  try {
    const orderSectionData = await createOrderInDatabase(req.body);
    res.status(200).json({
      message: "Order placed successfully.",
      data: { orders: orderSectionData.orders },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function to Fetch Order Data from the Database using Mongoose

const getOrderDataFromDatabase = async () => {
  try {
    const getOrderData = await userModel.find().select("orders");
    return getOrderData;
  } catch (error) {
    console.log(
      "Error Occured While fetching Order Data from the Database using Mongoose",
      error
    );
  }
};

//using Above Mongoose function with Express 'GET' Route to Fetch Orders Data from the Database

app.get("/api/fetch/orders", async (req, res) => {
  try {
    const orderData = await getOrderDataFromDatabase();
    if (!orderData) {
      res.status(404).json({ message: "Order Data Not Found." });
    } else {
      res.status(200).json({
        message: "Order Data Successfully Fetched from the Database.",
        data: { cart: orderData },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log("Server Is Running on PORT - ", PORT);
});
