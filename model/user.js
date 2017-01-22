module.exports = {
    _id: String,
    userName: String,
    passwd: String,
    token: String,
    thumbnailURL: String,
    _created_at: {
        type: Date,
        default: Date.now
    },
    _updated_at: {
        type: Date,
        default: Date.now
    },
    isAdmin: Boolean

}
