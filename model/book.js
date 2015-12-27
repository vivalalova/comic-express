module.exports = {
    _id: String,
    userName: String,
    passwd: String,
    token: String,
    thumbnailurl: String,
    createdAt: Date,
    updatedAt: {
        type: Date,
        default: Date.now
    }

}
