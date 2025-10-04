const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // who created book
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    cover: { type: String },
  },
  { timestamps: true }
);

// Virtual: link reviews dynamically
bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
});

// Virtual: average rating
bookSchema.virtual("averageRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return total / this.reviews.length;
});

bookSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Book", bookSchema);
