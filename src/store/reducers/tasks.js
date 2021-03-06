import * as actionType from '../actions/actions';
import { getDateString, getTString } from '../../Helpers/getDateString';
import uniqid from 'uniqid';
let initialState = {
  tasks: [],
  currentTitle: '',
  currentDescription: '',
};
if (!JSON.parse(localStorage.getItem('task'))) {
  localStorage.setItem('task', JSON.stringify(initialState));
} else {
  initialState = JSON.parse(localStorage.getItem('task'));
}

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TASK:
      const d = new Date();
      return {
        ...state,
        tasks: [
          {
            title: state.currentTitle,
            description: state.currentDescription,
            time: getTString(d),
            date: getDateString(d),
            sorterDate: d,
            id: uniqid(),
            pending: false,
          },
        ].concat(state.tasks),
      };
    case actionType.CHANGE_TITLE:
      return {
        ...state,
        currentTitle: action.curTitle,
      };
    case actionType.CHANGE_DESC:
      return {
        ...state,
        currentDescription: action.curDesc,
      };
    case actionType.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.eleId),
      };
    case actionType.CHANGE_STATUS:
      const newData = state.tasks.filter((task) => task.id === action.eleId);
      const pendingStatus = !newData[0].pending;
      const newArr = [...state.tasks];
      const index = state.tasks.findIndex((task) => task.id === action.eleId);
      newArr[index] = {
        ...newArr[index],
        pending: !newArr[index].pending,
      };
      return {
        ...state,
        tasks: newArr,
      };
      break;

    case actionType.EDIT_TASK:
      const newArr2 = [...state.tasks];
      const ind = state.tasks.findIndex((task) => task.id === action.eleId);
      newArr2[ind] = {
        ...newArr2[ind],
        title: action.newTitle,
        description: action.newDescription,
      };

      return {
        ...state,
        tasks: newArr2,
      };
    default:
      return {
        ...state,
      };
  }
};

export default tasks;
