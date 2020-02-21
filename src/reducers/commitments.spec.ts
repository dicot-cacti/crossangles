import { events } from './commitments';
import { ClearNoticeAction, CLEAR_NOTICE, EventAction, TOGGLE_EVENT, CourseAction, ADD_COURSE } from '../actions';
import { baseState } from '../state';

const otherAction: ClearNoticeAction = { type: CLEAR_NOTICE };

describe('events reducer', () => {
  it('initialises correctly', () => {
    const state = events(undefined, otherAction);
    expect(state).toEqual(baseState.events);
  })

  it('doesn\'t change on no-op actions', () => {
    const state = Object.freeze([...baseState.events]);
    const result = events(state, otherAction);
    expect(result).toBe(state);
  })

  it('allows toggling one event on', () => {
    const state = Object.freeze([...baseState.events]);
    const action: EventAction = {
      type: TOGGLE_EVENT,
      event: 'abc',
    };
    const result = events(state, action);
    expect(result).toContain('abc');
  })

  it('allows toggling one events off', () => {
    const state = Object.freeze(['abc']);
    const action: EventAction = {
      type: TOGGLE_EVENT,
      event: 'abc',
    };
    const result = events(state, action);
    expect(result).toEqual([]);
  })

  it('allows toggling one of many events on', () => {
    const state = Object.freeze(['a', 'b']);
    const action: EventAction = {
      type: TOGGLE_EVENT,
      event: 'c',
    };
    const result = events(state, action);
    expect(result).toEqual(['a', 'b', 'c']);
  })

  it('allows toggling one of many events of', () => {
    const state = Object.freeze(['a', 'b', 'c']);
    const action: EventAction = {
      type: TOGGLE_EVENT,
      event: 'c',
    };
    const result = events(state, action);
    expect(result).toEqual(['a', 'b']);
  })

  it('selects event if the course only has one event', () => {
    const state = Object.freeze([]);
    const action: CourseAction = {
      type: ADD_COURSE,
      course: {
        code: '',
        name: '',
        isAdditional: true,
        streams: [
          { component: 'a', enrols: [0, 0], times: [] },
          { component: 'a', enrols: [0, 0], times: [] },
        ],
      },
    };
    const result = events(state, action);
    expect(result).toEqual(['a']);
  })

  it('doesn\'t select event if the course has more than one', () => {
    const state = Object.freeze([]);
    const action: CourseAction = {
      type: ADD_COURSE,
      course: {
        code: '',
        name: '',
        isAdditional: true,
        streams: [
          { component: 'a', enrols: [0, 0], times: [] },
          { component: 'b', enrols: [0, 0], times: [] },
        ],
      },
    };
    const result = events(state, action);
    expect(result).toEqual([]);
  })

  it('doesn\'t select "events" from non additional courses', () => {
    const state = Object.freeze([]);
    const action: CourseAction = {
      type: ADD_COURSE,
      course: {
        code: '',
        name: '',
        streams: [
          { component: 'a', enrols: [0, 0], times: [] },
        ],
      },
    };
    const result = events(state, action);
    expect(result).toEqual([]);
  })

  it('doesn\'t select events from auto-selected courses', () => {
    const state = Object.freeze([]);
    const action: CourseAction = {
      type: ADD_COURSE,
      course: {
        code: '',
        name: '',
        isAdditional: true,
        autoSelect: true,
        streams: [
          { component: 'a', enrols: [0, 0], times: [] },
        ],
      },
    };
    const result = events(state, action);
    expect(result).toEqual([]);
  })
})
