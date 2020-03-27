var mongoose = require('mongoose')

// create hotel schema
var hotelSchema = new mongoose.Schema({
    name: String,
    pricePerNight: Number,
    website: String,
    address: {
        street: String,
        city: String,
        country: String
    },
    reviews: [{
        name: String,
        rating: {
            type: Number,
            max: 5,
            required: [true, 'Please rate this hotel.']
          },
        comment: String,
    }],
    created: { type: Date, default: Date.now() }
})

// export so it's public
module.exports = mongoose.model('Hotel', hotelSchema)

