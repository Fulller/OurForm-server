import createHttpError from "http-errors";
import Paragraph from "../models/Paragraph.model.js";

const ParagraphService = {
  createWithQuestionData: async function () {
    try {
      const paragraph = await Paragraph.create({});
      return paragraph;
    } catch (err) {
      throw createHttpError(400, "Create paragraph failed");
    }
  },
};

export default ParagraphService;
