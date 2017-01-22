module.exports = {
    _id: String,
    catalogID:String,
    author: String,
    category: {
        type: String,
        index: true
    },
    description: String,
    thumbnailURL: String,
    title: String,
    URL: String,
    hot: {
        type: Number,
        default: 0,
        index: true
    },
    _created_at: {
        type: Date,
        default: Date.now
    },
    _updated_at: {
        type: Date,
        default: Date.now
    },
    pages:[String]
}
