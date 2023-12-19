import _ from "lodash";

const questionType = {
  short_answer: {
    type: "short_answer",
    hasQuestionData: false,
    hasAnswerData: false,
  },
  paragraph: {
    type: "paragraph",
    hasQuestionData: false,
    hasAnswerData: false,
  },
  multiple_choice: {
    type: "multiple_choice",
    hasQuestionData: true,
    hasAnswerData: true,
  },
  checkbox: {
    type: "checkbox",
    hasQuestionData: true,
    hasAnswerData: true,
  },
  dropdown_menu: {
    type: "dropdown_menu",
    hasQuestionData: true,
    hasAnswerData: true,
  },
};
const questionTypeArray = _.values(questionType);
const questionTypeHasQuestionData = _.filter(questionType, {
  hasQuestionData: true,
});
export { questionType, questionTypeHasQuestionData, questionTypeArray };
