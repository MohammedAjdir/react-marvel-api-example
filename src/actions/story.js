export function storyHasErrored(bool) {
    return {
        type: 'STORY_HAS_ERRORED',
        hasErrored: bool
    };
}

export function storyIsLoading(bool) {
    return {
        type: 'STORY_IS_LOADING',
        isLoading: bool
    };
}

export function storyFetchDataSuccess(story) {
    return {
        type: 'STORY_FETCH_DATA_SUCCESS',
        story
    };
}

export function storyFetchData(url) {
    return (dispatch) => {
        dispatch(storyIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(storyIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((story) => 
				dispatch(storyFetchDataSuccess(story)))
            .catch(() => dispatch(storyHasErrored(true)));
    };
}
