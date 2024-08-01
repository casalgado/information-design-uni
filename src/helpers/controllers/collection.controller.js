import { Collection } from "../models/collection.model.js";
import { db } from "../../main.js";
import { ref, child, set, push, update } from "firebase/database";

const path = "collections/";

const addCollection = async (formData) => {
  try {
    const data = formData;
    console.log(data);

    if (data.title == null || data.title == "")
      throw new Error("title cannot be empty");

    const key = push(child(ref(db), path)).key;
    const collection = new Collection(data);

    return await set(ref(db, `${path}/${key}`), collection).then(() => {
      console.log("Data saved successfully!");
      return "Data saved successfully!";
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCollection = async (formData, id) => {
  try {
    const data = formData;
    console.log(data);
    const collection = new Collection(data);
    return await update(ref(db, `${path}/${id}`), collection).then(() => {
      console.log("Data updated successfully!");
      return "Data updated successfully!";
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneCollection = async (req, res) => {
  try {
    const id = req.params.id;
    const collection = await ref.child(id).once("value");
    if (collection.val() == null) {
      res.status(404).send("Categoria no encontrada.");
    } else {
      res.send(collection.val());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCollection = async (req, res) => {
  try {
    const id = req.params.id;
    // check if id is present
    if (id == null || id == "undefined") throw new Error("id cannot be empty");
    // saves a copy of the object in database
    const c = await ref.child(id).once("value");
    const collection = new Collection(c.val());
    collection.deleted_at = +new Date();
    console.log(`deleted\n`, collection);
    await database.ref("deleteHistory").child(path).push(collection);
    await ref.child(id).remove();
    res.send("Categoria eliminada exitosamente.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { addCollection, getOneCollection, updateCollection, deleteCollection };
