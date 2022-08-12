const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const Product = require("../model/Product");
const auth = require("../middleware/auth");
const Order = require("../model/Order");

/**
 * @method - POST
 * @param - /register
 * @desciption - User register
 */

router.post(
  "/v1/users/register",
  [
    check("firstName", "Please Enter first name").not().isEmpty(),
    check("lastName", "Please Enter last name").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(200).json({
          message: "User Already Exists",
        });
      }
      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: "success",
            message: "user created successfully",
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Error in Saving!");
    }
  }
);

router.post("/v1/users/login", [
  check("email", "Email address  is mandatory").not().isEmpty(),
  check("password", "Password  is mandatory").not().isEmpty(),
  check("email", "Please Enter a valid Email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Does Not Exist!",
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect Password!",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      //const id = user.id;
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, accessToken) => {
          if (err) throw err;
          res.status(200).json({
            status: "success",
            message: "user logged in successfully.",
            accessToken,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  },
]);

router.get("/v1/profile", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching User" });
  }
});

router.post("/v1/profile", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const { profileImage, address } = req.body;
    await user.updateOne({ address: address, profileImage: profileImage });

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      message: "user profile been updated successfully",
      profile: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching User" });
  }
});

router.patch("/v1/profile/address", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const { profile } = req.body;
    await user.updateOne({ address: profile.address });

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      message: "profile modified successfully",
      profile: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching User" });
  }
});

router.patch("/v1/profile/image", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const { profileImage } = req.body;
    await user.updateOne({ profileImage: profileImage });

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      message: "profile image updated successfully",
      profile: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching User" });
  }
});

router.delete("/v1/profile/image", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const profileImage = req.body;
    await user.updateOne({ profileImage: null });

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      message: "profile image deleted successfully",
      profile: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching User" });
  }
});

router.get("/v1/admin/products", async (req, res) => {
  try {
    const product = await Product.find({ isDelete: false }).sort({
      createdOn: "desc",
    });
    res.status(200).json({
      status: "success",
      message: "list of all products fetched successfully",
      products: product,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching Product" });
  }
});

router.get("/v1/products/:PRODUCT_ID", async (req, res) => {
  try {
    console.log(req.params.PRODUCT_ID);
    const pid = req.params.PRODUCT_ID;
    const product = await Product.findById(pid);
    res.status(200).json({
      status: "success",
      message: " fetched successfully",
      product: product,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in Fetching Product" });
  }
});

router.delete("/v1/admin/products/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const pid = req.params.id;

    //await Product.deleteOne(pid);
    //perform logical delete only
    const product = await Product.findOneAndUpdate(
      { id: pid },
      { isDelete: true }
    );
    console.log({ product });

    res.status(200).json({
      status: "success",
      message: "product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in deleting Product" });
  }
});

router.patch("/v1/admin/products/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const pid = req.params.id;
    const product = await Product.find({ id: pid });

    const { isTopProduct } = req.body.isTopProduct;

    if (isTopProduct) {
      await product.updateOne({ isTopProduct: isTopProduct });
    }

    //const updatedProduct = await Product.findById(pid);
    res.status(200).json({
      status: "success",
      message: "product edited successfully",
      //profile: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in updating Product" });
  }
});

router.post(
  "/v1/admin/add-new-product",
  [
    check("name", "Please enter product name").not().isEmpty(),
    check("category", "Please enter valid category").not().isEmpty(),
    check("price", "Please enter a valid price").isNumeric(),
    check("image", "Please enter valid image").not().isEmpty(),
    check("description", "Please enter product description").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, category, price, discountPrice, description, image } =
      req.body;
    const id = Math.random();
    try {
      let product = await Product.findOne({
        name,
      });
      if (product) {
        return res.status(200).json({
          message: "Product Already Exists",
        });
      }
      product = new Product({
        id,
        name,
        category,
        price,
        discountPrice,
        description,
        image,
      });

      await product.save();

      const payload = {
        product: {
          id: product.id,
        },
      };

      res.status(200).json({
        status: "success",
        message: "Product created successfully",
        payload,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Error in Saving!");
    }
  }
);

router.get("/v1/homepage/products", async (req, res) => {
  try {
    const product = await Product.find({ isDelete: false }).limit(8);
    res.status(200).json({
      status: "success",
      message: "list of 8 products fetched successfully",
      products: product,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching Product" });
  }
});

router.get("/v1/homepage/banner", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      message: "banner images retrived of last 3 added products successfully",
      products: product,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching Product" });
  }
});

router.get("/v1/homepage/categories", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      message: "list of 3 categories fetched successfully",
      products: product,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching Product" });
  }
});

router.post("/v1/checkout", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const userId = req.user.id;
    const { email, cart, shippingAddress } = req.body;

    console.log("userId" + userId);
    console.log("email" + email);
    order = new Order({
      userId,
      email,
      cart,
      shippingAddress,
    });

    await order.save();
    const payload = {
      order: {
        id: order.id,
        email: order.email,
      },
    };

    res.status(200).json({
      status: "success",
      message: "order placed successfully",
      payload: payload,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in placing order" });
  }
});

router.post("/v1/guest/checkout", async (req, res) => {
  try {
    const { guest, email, cart, shippingAddress } = req.body;
    //console.log(guest);
    order = new Order({
      guest,
      email,
      cart,
      shippingAddress,
    });

    await order.save();
    const payload = {
      order: {
        id: order.id,
        email: order.email,
      },
    };
    res.status(200).json({
      status: "success",
      message: "order placed successfully",
      payload: payload,
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in placing order" });
  }
});

router.get("/v1/orders", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    const userId = req.user.id;

    console.log(user.isAdminRole);

    if (user.isAdminRole) {
      order = await Order.find({ isDeleted: false }).sort({
        isDelivered: "asc",
      });
    } else {
      order = await Order.find({ userId: userId, isDeleted: false }).sort({
        isDelivered: "asc",
      });
    }
    res.status(200).json({
      status: "success",
      message: "list of all orders fetched successfully",
      orders: order,
    });
  } catch (e) {
    res.send({ message: "Error in Fetching Orders" });
  }
});

router.patch("/v1/orders/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id);
    const oid = req.params.id;
    console.log(oid);

    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    console.log(user.isAdminRole);

    const order = req.body;
    console.log(req.body);
    console.log(order.isDelivered);
    const isDelivered = order.isDelivered;

    if (user.isAdminRole) {
      originalOrder = await Order.findById(oid);
      await originalOrder.updateOne({ isDelivered: isDelivered });

      res.status(200).json({
        status: "success",
        message: "order modified successfully",
      });
    } else {
      res.status(401).json({
        status: "Unauthorized",
        message: "You are unauthorized to modify order",
      });
    }
    //await Product.deleteOne(pid);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in modifying order" });
  }
});

router.delete("/v1/orders/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id);
    const oid = req.params.id;

    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    //const order = await Order.findById(oid);
    console.log(user.isAdminRole);
    console.log(oid);

    if (user.isAdminRole) {
      //perform logical delete only
      originalOrder = await Order.findById(oid);
      await originalOrder.updateOne({ isDeleted: true });

      //await Order.deleteOne(order);
      console.log({ originalOrder });

      res.status(200).json({
        status: "success",
        message: "order deleted successfully",
      });
    } else {
      res.status(401).json({
        status: "Unauthorized",
        message: "You are unauthorized to delete order",
      });
    }
    //await Product.deleteOne(pid);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in deleting order" });
  }
});

module.exports = router;
