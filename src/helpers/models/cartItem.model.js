class CartItem {
  constructor({ created_at, client_info, order_info, hidden = false }) {
    // flatten spiceLevel and cutlery
    console.log(order_info);
    order_info.map((e) => {
      e.spiceLevel = e.spiceLevel || "";
      e.cutlery = e.cutlery || "";
      e.comboDrink = e.comboDrink || "";
      return e;
    });

    if (client_info.locality == undefined) {
      client_info.locality = "";
    }

    if (client_info.houseNumber == undefined) {
      client_info.houseNumber = "";
    }

    let timestamp = +new Date();
    this.created_at = created_at || timestamp;
    this.client_info = client_info;
    this.order_info = order_info;
    this.hidden = hidden;
    this.total = order_info.reduce((acc, curr) => acc + curr.total, 0);
  }
}

export { CartItem };
