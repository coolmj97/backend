module.exports = (mongoose) => {
  const Feed = mongoose.model(
    "feed",
    mongoose.Schema(
      {
        photos: { type: [String], required: true },
        content: { type: String, required: true },
        thumbnailUrl: { type: String, default: null },
        isLiked: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );

  return Feed;
};
