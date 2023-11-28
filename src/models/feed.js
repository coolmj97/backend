module.exports = (mongoose) => {
  const Feed = mongoose.model(
    'feed',
    mongoose.Schema(
      {
        user: { type: Object, required: true },
        title: { type: String, required: true },
        photos: { type: Object },
        content: { type: String, required: true },
        uid: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

  return Feed;
};
