'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var OrderSchema = new Schema({
    orderNoSplit: [
      {
          name: String,
          foods: [
              {
                  _id: String,
                  discounts: [
                      {
                          _id: String,
                          amount: String,
                          name: String,
                          percent: String,
                          selected: Boolean
                      }
                  ],
                  foodCategoryId: String,
                  name: String,
                  options: [
                      {
                          _id: String,
                          name: String,
                          price: String,
                          selected: Boolean
                      }
                  ],
                  note: String,
                  price: String,
                  quantity: Number,
                  subTotal: String
              }
          ]
      }
    ],
    customerNumber: Number,
    paymentMethodId: Number,
    room: {
      _id: String,
      name: String
    },
    taxes: [
      {
          _id: String,
          amount: String,
          name: String,
          percent: String
      }
    ],
    discounts: [
        {
            _id: String,
            amount: String,
            name: String,
            percent: String
        }
    ],
    createAt: Date,
    updateAt: Date,
    orderNumber: Number,
    total: String,
    totalDiscount: String,
    totalNow: String,
    totalTax: String
});

module.exports = mongoose.model('Order', OrderSchema);