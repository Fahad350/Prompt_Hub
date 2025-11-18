import Prompt from "../models/promptSchema.js";

// create prompts
export const handleCreatePrompt = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user?._id || req.body.user;

    if (!title || !content || !user) {
      return res.status(400).json({
        message: "all fields required",
      });
    }

    const newPrompt = await Prompt.create({
      title,
      content,
      user,
    });

    res.status(200).json({
      message: "Created New Propmpt Successfully!",
      prompt: newPrompt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "prompt creation error",
      error: error.message,
    });
  }
};

// get all prompts + public + search + pagination

export const handleAllPrompts = async (req, res) => {
  try {
    // Query Params
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Base Filter
    const query = { isPublic: false, status: "active" };

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Count matching docs
    const total = await Prompt.countDocuments(query);

    // Fetch prompts
    const prompts = await Prompt.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      message: "Prompts fetched successfully!",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      prompts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching prompts",
      error: error.message,
    });
  }
};

// get single prompt

export const handleSignlePrompt = async (req, res) => {
  try {
    const { promptId } = req.params;
    const singlePrompt = await Prompt.findOne(promptId);
    return res.status(200).json({
      message: "Fetch Single Prompt Successfully!",
      singlePrompt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error fetching prompt",
      error: error.message,
    });
  }
};

// update prompts owner can update only

export const handleUpdatePromptByUser = async (req, res) => {
  try {
    const { id: promptId } = req.params;
    const userId = req.user?._id || req.body.user;
    const { title, content, tags, isPublic } = req.body;

    const isExist = await Prompt.findById(promptId);

    if (!isExist) {
      return res.status(400).json({
        message: "Prompt not found",
      });
    }

    if (isExist.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this prompt" });
    }

    if (title) isExist.title = title;
    if (content) isExist.content = content;
    if (typeof isPublic === "boolean") isExist.isPublic = isPublic;
    if (tags) isExist.tags = tags;

    const updatedPrompt = await isExist.save();

    return res.status(200).json({
      message: "Prompt Updated Successfully",
      prompt: updatedPrompt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Prompt update error",
      error: error.message,
    });
  }
};

// delete prompt
export const handleDeletePrompt = async (req, res) => {
  try {
    const { id: promptId } = req.params;
    const userId = req.user._id || req.body.user; // authenticated user

    // Find the prompt
    const prompt = await Prompt.findById(promptId);

    if (!prompt) {
      return res.status(404).json({
        message: "Prompt not found",
      });
    }

    // Ownership check
    if (prompt.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this prompt",
      });
    }

    // Delete the prompt
    await prompt.deleteOne();

    return res.status(200).json({
      message: "Prompt deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Prompt delete error",
      error: error.message,
    });
  }
};

// all user's prompts
export const handleUserPromptById = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const prompts = await Prompt.find({ user: userId }).sort({
      createdAt: -1,
    });

    if (prompts.length === 0) {
      return res.status(404).json({
        message: "No prompts found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      total: prompts.length,
      prompts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "fetch user prompt error",
      error: error.message,
    });
  }
};
