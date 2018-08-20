export function storyHasErrored(state = false, action) {
    switch (action.type) {
        case 'STORY_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function storyIsLoading(state = false, action) {
    switch (action.type) {
        case 'STORY_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function story(state = [], action) {
    switch (action.type) {
        case 'STORY_FETCH_DATA_SUCCESS':
            return action.story;

        default:
            return state;
    }
}
