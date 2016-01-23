module.exports = {
    _id: String,
    userName: String,
    passwd: String,
    token: String,
    thumbnailurl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: Boolean

}
