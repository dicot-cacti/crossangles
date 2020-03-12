import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { requestData } from '../requestData';
import { Meta } from '../state/Meta';
import { CourseData } from '../state/Course';

export const SET_COURSE_DATA = 'SET_COURSE_DATA';
export const SET_COURSE_MANAGER = 'SET_COURSE_MANAGER';
export const SET_META_DATA = 'SET_META_DATA';

export interface CourseListAction extends Action {
  type: typeof SET_COURSE_DATA;
  courses: CourseData[];
}
export interface MetaAction extends Action {
  type: typeof SET_META_DATA;
  meta: Meta;
}

export function fetchData (): ThunkAction<Promise<void>, {}, undefined, AnyAction> {
  return async dispatch => {
    return requestData().then(async data => {
      const setCourseAction: CourseListAction = {
        type: SET_COURSE_DATA,
        courses: data.courses,
      };

      await Promise.all([
        dispatch(setCourseAction),
        dispatch({
          type: SET_META_DATA,
          meta: data.meta,
        }),
      ]);
    });
  };
}
