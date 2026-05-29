const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clothing" }],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Clothing" },
        quantity: { type: Number, default: 1 },
      },
    ],
    orders: [
      {
        items: Array,
        totalAmount: Number,
        date: { type: Date, default: Date.now },
        shippingAddress: {
          userId: {
            type: String,
            require: true,
          },
          Country: {
            type: String,
            require: true,
          },
          FullName: {
            type: String,
            require: true,
          },
          MobileNumber: {
            type: String,
            require: true,
          },
          Pincode: {
            type: String,
            require: true,
          },
          FlatNo: {
            type: String,
            require: true,
          },
          Area: {
            type: String,
            require: true,
          },
          Landmark: {
            type: String,
            require: true,
          },
          Town: {
            type: String,
            require: true,
          },
          State: {
            type: String,
            require: true,
          },
        },
      },
    ],
  },
  { timestamp: true }
);

const User = mongoose.model("UserProfile", UserSchema);

module.exports = User;
