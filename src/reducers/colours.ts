import { COURSE_COLOURS, ColourMap, Colour } from '../state/Colours';
import { ADD_COURSE, SET_COLOUR, AllActions, SET_COURSE_DATA, REMOVE_COURSE } from '../actions';
import { getCourseId } from '../state/Course';
import { initialState } from '../state';

export function colours (state = initialState.colours, action: AllActions): ColourMap {
  const chosenColours = Object.values(state);

  if (action.type === ADD_COURSE) {
    const courseId = getCourseId(action.course);

    // Return state without modifications if there is already a colour for this course
    if (state[courseId]) {
      return state;
    }

    const colour = action.course.defaultColour || pickColour(chosenColours);
    return {
      ...state,
      [courseId]: colour,
    };
  }

  if (action.type === REMOVE_COURSE) {
    const courseId = getCourseId(action.course);

    state = { ...state };
    delete state[courseId];
    return state;
  }

  if (action.type === SET_COLOUR) {
    const newColour = action.colour ? action.colour : pickColour(chosenColours);
    return {
      ...state,
      [action.course]: newColour,
    };
  }

  if (action.type === SET_COURSE_DATA) {
    const additional = action.courses.filter(c => c.isAdditional && c.autoSelect);
    const colourPool = [...COURSE_COLOURS];
    state = Object.assign(
      {},
      ...additional.map(c => {
        let colour = c.defaultColour || pickColour(chosenColours, colourPool);
        colourPool.splice(colourPool.indexOf(colour), 1);
        return { [getCourseId(c)]: colour };
      }),
      state,
    );

    return state;
  }

  return state;
};

function pickColour (chosenColours: Colour[], colourPool: Colour[] = COURSE_COLOURS): Colour {
  // Prefer to choose any colours which haven't been chosen yet
  let canChoose = colourPool.filter(c => !chosenColours.includes(c));

  // All colours have been chosen at least once, so just pick anything
  if (canChoose.length === 0) {
    canChoose = colourPool;
  }

  const i = Math.floor(Math.random() * canChoose.length);
  const colour = canChoose[i];
  return colour;
}
