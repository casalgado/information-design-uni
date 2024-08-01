import { db } from "../main";
import {
  ref,
  child,
  query,
  orderByChild,
  get,
  set,
  remove,
} from "firebase/database";
import { addProduct, updateProduct } from "./controllers/product.controller";
import {
  addCollection,
  updateCollection,
} from "./controllers/collection.controller";
import { addCartItem } from "./controllers/cartItem.controller";

function getToken() {
  return localStorage.getItem("AuthToken");
}

// all these methods return promises, responses are processed in components using res
async function getAll(path) {
  let orderBy = "created_at";
  if (path == "products" || path == "collections") {
    orderBy = "order";
  }
  try {
    const responseArray = [];
    return await get(query(ref(db, path), orderByChild(orderBy))).then(
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (child) {
            let c = { ...child.val() };
            c.id = child.key;
            responseArray.push(c);
          });

          return { data: responseArray };
        } else {
          console.log("No data available");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getOne(path, id) {
  const dbRef = ref(db);

  try {
    return await get(child(dbRef, `${path}/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return { data: snapshot.val() };
      } else {
        console.log("No data available");
      }
    });
  } catch (error) {
    console.log(error);
  }

  console.log("getOne");
}

async function createOneProduct(formData) {
  return await addProduct(formData);
}

async function createOneCollection(formData) {
  return await addCollection(formData);
}

async function createOneCartItem(formData) {
  return await addCartItem(formData);
}

async function updateOneProduct(formData, id) {
  return await updateProduct(formData, id);
}

async function updateOneCollection(formData, id) {
  return await updateCollection(formData, id);
}

async function destroyOne(path, object) {
  try {
    await set(ref(db, `history/${path}/${object.id}`), object).then(() => {
      console.log("Data saved successfully!");
    });
    console.log(`${path}/${object.id}`);
    return await set(ref(db, `${path}/${object.id}`), null).then(() => {
      console.log("Data deleted successfully!");
      return "Data deleted successfully!";
    });
  } catch (error) {
    console.log(error);
  }
}

function updateAll() {
  // return server({
  //   method: "patch",
  //   url: `/admin/products/all`,
  //   headers: {
  //     AuthToken: getToken(),
  //   },
  //   data: {},
  // })
  //   .then((res) => res)
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

export {
  getAll,
  getOne,
  createOneProduct,
  createOneCollection,
  createOneCartItem,
  updateOneProduct,
  updateOneCollection,
  destroyOne,
  updateAll,
};
