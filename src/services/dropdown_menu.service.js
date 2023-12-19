import createHttpError from "http-errors";
import DropdownMenu from "../models/DropdownMenu.model.js";
import { OptionService } from "./index.js";

const DropdownMenuService = {
  createWithQuestionData: async function () {
    const option = await OptionService.createDefault();
    try {
      const dropdownMenu = await DropdownMenu.create({
        question_data: [option._id],
        answer_data: null,
      });
      return dropdownMenu;
    } catch (err) {
      throw createHttpError(400, "Create dropdown menu failed");
    }
  },
};

export default DropdownMenuService;
