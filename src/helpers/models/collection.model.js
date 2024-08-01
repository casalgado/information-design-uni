class Collection {
  constructor({
    title,
    description,
    images = [{ original: "placeholder-menu.png" }],
    canBeAddedToCartItem = false,
    created_at,
    order,
  }) {
    let timestamp = +new Date();
    this.title = title.trim();
    this.description = description.trim();
    this.images = images;
    this.canBeAddedToCartItem = canBeAddedToCartItem;
    this.created_at = created_at || timestamp;
    this.order = order || created_at || timestamp;
  }
}

export { Collection };
