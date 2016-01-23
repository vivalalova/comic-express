module.exports = {
    _id: String,
    author: String,
    category: {
        type: String,
        index: true
    },
    description: String,
    thumbnailurl: String,
    title: String,
    url: String,
    hot: {
        type: Number,
        default: 0,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    },

}
