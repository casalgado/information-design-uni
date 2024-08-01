import { CartItem } from "../models/cartItem.model.js";
import { db } from "../../main.js";
import { ref, child, set, push } from "firebase/database";

const path = "cartItems/";

const addCartItem = async (formData) => {
  try {
    const data = formData;
    console.log(data);

    const key = push(child(ref(db), path)).key;
    const cartItem = new CartItem(data);
    console.log(cartItem);
    return await set(ref(db, `${path}/${key}`), cartItem).then(() => {
      console.log("Data saved successfully!");
      return "Data saved successfully!";
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCartItems = async (req, res) => {
  try {
    let cartItemArray = [];
    await ref.orderByChild("created_at").once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        let c = { ...child.val() };
        c.id = child.key;
        cartItemArray.push(c);
      });
    });
    console.log(cartItemArray);
    res.send(cartItemArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await ref.child(id).once("value");
    if (cartItem.val() == null) {
      res.status(404).send("Orden no encontrada.");
    } else {
      res.send(cartItem.val());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCartItem = async (req, res) => {
  // try {
  //   const id = req.params.id;
  //   const data = req.body;
  //   const cartItem = new CartItem(data);
  //   await ref.child(id).update(cartItem);
  //   res.send("Orden modificada exitosamente.");
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
};

const deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    // check if id is present
    if (id == null || id == "undefined") throw new Error("id cannot be empty");
    // saves a copy of the object in database
    const ci = await ref.child(id).once("value");
    const cartItem = new CartItem(ci.val());
    cartItem.deleted_at = +new Date();
    console.log(`deleted\n`, cartItem);
    await database.ref("deleteHistory").child(path).push(cartItem);
    await ref.child(id).remove();
    res.send("Orden eliminada exitosamente.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export {
  addCartItem,
  getAllCartItems,
  getOneCartItem,
  updateCartItem,
  deleteCartItem,
};
