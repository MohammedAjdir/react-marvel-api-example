import { combineReducers } from 'redux';
import { story, storyHasErrored, storyIsLoading } from './story';

export default combineReducers({
    story,
    storyHasErrored,
    storyIsLoading
});
