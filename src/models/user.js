module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, required: true },
        sex: { type: String, required: true },
        following: { type: Number, default: 0 },
        follower: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        feeds: { type: Array, default: [] },
        likes: { type: Array, default: [] },
        profileUrl: { type: String, default: null },
        introduction: { type: String, default: "" },
      },
      { timestamps: true }
    )
  );

  return User;
};
