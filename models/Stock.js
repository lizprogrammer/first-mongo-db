const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    symbol: {
    type: String,
    required: true
  },
    price:{
    type: String,
    require: true
  },
    change {    
    type: String,
    require: true
  },
  percentChange: {
    type: String,
  }
})



module.exports = User = mongoose.model("stocks", UserSchema);

