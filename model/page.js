module.exports = {
    _id: String,
    author: String,
    category: String,
    // chapter: {
   //     type: String,
   //     index: true
   // },
    description: String,
    thumbnailurl: String,
    title: String,
    url: String,
    createdAt: Date,
    updatedAt: {
        type: Date,
        default: Date.now
    }

}
