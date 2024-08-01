import { Product } from "../models/product.model.js";
import { db, storage } from "../../main.js";
import { ref, child, set, push, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const path = "products/";

const addProduct = async (formData) => {
  const data = formData.values;
  const files = formData.files;
  console.log("data:", data);
  console.log("files:", files);
  // get key
  const key = push(child(ref(db), path)).key;
  // create product instance
  const product = new Product(data);
  return await saveProduct(key, product, data, files);
};

const updateProduct = async (formData, id) => {
  const data = formData.values;
  const files = formData.files;
  console.log("data:", data);
  console.log("files:", files);
  // get key
  const key = id;
  // create product instance
  const product = new Product(data);
  console.log(product);
  return await saveProduct(key, product, data, files);
};

async function saveProduct(key, product, data, files) {
  try {
    // data validation
    if (data.title == null || data.title == "")
      throw new Error("title cannot be empty");

    if (data.price == null || data.price == "")
      throw new Error("price cannot be empty");

    if (isNaN(data.price)) throw new Error("price must be a number");

    if (data.collection == null || data.collection == "")
      throw new Error("collection cannot be empty");

    let fullPath;
    let originalUrl;
    if (files.featured) {
      // store image
      const images = [];
      const refPath = `images/${key}/featured-${Date.now()}`;
      const imageRef = storageRef(storage, refPath);

      await uploadBytes(imageRef, files.featured)
        .then((snapshot) => {
          console.log("Uploaded blob or file");
          console.log(snapshot);
          console.log(snapshot.metadata.fullPath);
          fullPath = snapshot.metadata.fullPath;
          return getDownloadURL(
            storageRef(storage, `${snapshot.metadata.fullPath}`)
          );
        })
        .then((downloadURL) => {
          console.log(fullPath);
          images.push({
            optimized: false,
            refPath: refPath,
            fullPath: fullPath,
            original: downloadURL,
          });
          console.log("Download URL", downloadURL);
          originalUrl = downloadURL;
        });
      console.log("images", images);
      product.images = images;
    }
    // save database object
    return await set(ref(db, `${path}/${key}`), product).then(() => {
      if (files.featured) {
        // get resized images
        let tinyUrl = getDownloadURL(
          storageRef(storage, `${fullPath}_200x200`)
        );
        let smallUrl = getDownloadURL(
          storageRef(storage, `${fullPath}_300x300`)
        );
        let largeUrl = getDownloadURL(
          storageRef(storage, `${fullPath}_800x800`)
        );
        Promise.all([tinyUrl, smallUrl, largeUrl])
          .then((results) => {
            const [tinyUrlResult, smallUrlResult, largeUrlResult] = results;

            console.log("Tiny URL:", tinyUrlResult);
            console.log("Small URL:", smallUrlResult);
            console.log("Large URL:", largeUrlResult);
            const newImages = {
              images: [
                {
                  tiny: tinyUrlResult,
                  small: smallUrlResult,
                  large: largeUrlResult,
                  original: originalUrl,
                  fullPath: fullPath,
                  optimized: true,
                },
              ],
            };
            return newImages;
          })
          .then((newImages) => {
            console.log(newImages);
            // update db object with resized images
            update(ref(db, `${path}/${key}`), newImages);
          });
      }
      console.log("Data saved successfully!");
      return "Data saved successfully!";
    });
  } catch (error) {
    console.log(error);
  }
}

const getAllProducts = async (req, res) => {
  try {
    let productArray = [];
    await ref.orderByChild("created_at").once("value", function (snapshot) {
      snapshot.forEach(function (child) {
        let c = { ...child.val() };
        c.id = child.key;
        productArray.push(c);
      });
    });
    res.send(productArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ref.child(id).once("value");
    if (product.val() == null) {
      res.status(404).send("Producto no encontrado.");
    } else {
      res.send(product.val());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAll = async (req, res) => {
  // try {
  //   let productArray = [];
  //   await ref.orderByChild("created_at").once("value", function (snapshot) {
  //     snapshot.forEach(function (child) {
  //       let c = { ...child.val() };
  //       c.id = child.key;
  //       productArray.push(c);
  //     });
  //   });
  //   console.log(productArray.length);
  //   res.send(productArray);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
};

export { addProduct, getAllProducts, getOneProduct, updateProduct, updateAll };

/* updateAll backup/history

for (let i = 0; i < productArray.length; i++) {
  console.log(".");
  let product = productArray[i];
  if (product.spicy == undefined) {
    await ref.child(product.id).update({ spicy: false });
    console.log("spicy-mod");
  }
  if (product.veggie == undefined) {
    await ref.child(product.id).update({ veggie: false });
    console.log("veggie-mod");
  }
  await ref.child(product.id).update({ combo: false });
  console.log("combo-mod");
}




   
    const product = new Product(data);
    console.log(product);
    // await ref.push(product);
    console.log("Producto creado exitosamente.");
    // empties upload folder (where multer uploads)
    // await fs.emptyDir(`uploads/`);

    */
