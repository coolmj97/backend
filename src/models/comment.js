module.exports = (mongoose) => {
  const Comment = mongoose.model(
    "comment",
    mongoose.Schema(
      {
        user: {
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
        content: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

  return Comment;
};
