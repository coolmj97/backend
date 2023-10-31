module.exports = (mongoose) => {
  const Feed = mongoose.model(
    "feed",
    mongoose.Schema(
      {
        photos: { type: [String], required: true },
        content: { type: String, required: true },
        thumbnailUrl: { type: String, default: null },
        likesCount: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

  return Feed;
};
