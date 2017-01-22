module.exports = {
    _id: String,
    author: String,
    category: String,
    // chapter: {
    //     type: String,
    //     index: true
    // },
    description: String,
    thumbnailURL: String,
    title: String,
    url: String,
    _created_at: {
        type: Date,
        default: Date.now
    },
    _updated_at: {
        type: Date,
        default: Date.now
    }

}
