import Data from "../models/Data.model.js";
import { questionType } from "../const/questionType.const.js";
import createHttpError from "http-errors";
import {
  ShortAnswerService,
  ParagraphService,
  MultipleChoiceService,
  CheckboxService,
  DropdownMenuService,
} from "./index.js";

const DataService = {
  createWithQuestionData: async function ({ type }) {
    let dataByType;
    switch (type) {
      case questionType.short_answer.type: {
        dataByType = await ShortAnswerService.createWithQuestionData();
        break;
      }
      case questionType.paragraph.type: {
        dataByType = await ParagraphService.createWithQuestionData();
        break;
      }
      case questionType.multiple_choice.type: {
        dataByType = await MultipleChoiceService.createWithQuestionData();
        break;
      }
      case questionType.checkbox.type: {
        dataByType = await CheckboxService.createWithQuestionData();
        break;
      }
      case questionType.dropdown_menu.type: {
        dataByType = await DropdownMenuService.createWithQuestionData();
        break;
      }
      default: {
        throw createHttpError(400, "Invalid question type");
      }
    }
    try {
      const data = await Data.create({ [type]: dataByType._id });
      return data;
    } catch (err) {
      throw createHttpError(400, "Create data failed");
    }
  },
};
export default DataService;
