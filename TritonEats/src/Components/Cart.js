var CurrentCart = {
    restaurant_name : "",
    order_arr : [],

    changeName : function(name) {
        this.resturant_name = name;
    },

    addToOrderArr : function(order) {
        for (i = 0; i < this.order_arr.length; i++) {
            if (this.order_arr[i]["key"] === order["key"]) {
                this.order_arr[i]["quantity"]++;
                return
            }
        }

        this.order_arr.push(order);
        
    },

    removeFromOrderArr : function(order) {
        for (i = 0; i < this.order_arr.length; i++) {
            if (this.order_arr[i]["key"] === order["key"]) {
                if (this.order_arr[i]["value"] > 1){
                    this.order_arr[i]["value"] --;
                    return
                }
            }
            this.order_arr.splice(i);
        }
    },

    emptyOrderArr : function() {
        this.order_arr = []
    }

}
module.exports = CurrentCart;