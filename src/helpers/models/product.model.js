/* 
title: String,
description: String,
price: Number,
collection: String(id),
productOptions: [{name: String, addedPrice: Number, id: String}]
created_at: Number
*/

class Product {
  constructor({
    title,
    description = "",
    price,
    collection,
    images = [
      {
        original: "",
        fullPath: "",
        optimized: false,
        refPath: "",
        url: "",
      },
    ],
    productOptions = [],
    secondOptions = [],
    created_at = +new Date(),
    inStock,
    combo,
    veggie,
    spicy,
    justAdded,
    order,
  }) {
    // convert price to a number
    price = parseInt(price);

    // parse all product options
    if (typeof productOptions == "string") {
      productOptions = JSON.parse(productOptions);
    }

    if (typeof secondOptions == "string") {
      secondOptions = JSON.parse(secondOptions);
    }

    if (productOptions.length > 0) {
      productOptions.forEach((e) => {
        // convert price to a number
        e.addedPrice = parseInt(e.addedPrice);
        // set unique id's for options if new product
        if (e.optionId == undefined || e.optionId == null) {
          e.optionId = Math.random().toString(36).substring(2, 9);
        }
      });
    }

    this.title = title.trim();
    this.description = description.trim();
    this.price = price;
    this.collection = collection;
    this.productOptions = productOptions;
    this.secondOptions = secondOptions;
    this.created_at = `${created_at}`;
    this.inStock = inStock;
    this.combo = combo;
    this.veggie = veggie;
    this.spicy = spicy;
    this.justAdded = justAdded;
    this.order = order || created_at;
    this.images = JSON.parse(JSON.stringify(images));
  }
}

export { Product };
