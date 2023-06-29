import Comment from "../model/comment.js";

export const newComment = async (request, response) => {
  try {
    let comment = await new Comment(request.body);
    comment.save();

    response.status(200).json({ msg: "comment saved successfuly!" });
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const getComments = async (request, response) => {
  try {
    let comments = await Comment.find({ postId: request.params.id });

    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const deleteComment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);
    await comment.deleteOne();
    response.status(200).json({ msg: "comment deleted successfuly!" });
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};
