import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { storyFetchData } from '../actions/story';
import md5 from 'md5';

class Main extends Component {
	
    componentDidMount() {
		
		let now = Date.now();
		let publicKey = "XXXXXX"; // public key goes here
		let privateKey = "XXXXXX" ; // private key goes here
		let hash = md5(now + privateKey + publicKey);
        this.props.fetchData('https://gateway.marvel.com/v1/public/stories/29?ts='+ now + '&apikey=' + publicKey + '&hash=' + hash);
		
    }
	
    render() {
		
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the story</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading that awesome story...</p>;
        }
		
		let story = this.props.story || {};
		
        return (
		
            <div>
			
				{story.data && (
					<div>
					
						<p> Title. { story.data.results[0].title }</p>
						
						<p> Description. { story.data.results[0].description }</p>
						
						<p>Main characters. </p>
						
							<ul>
							{story.data.results[0].characters.items.map((character, index) => (
								<li key={character.id}> {character.name} </li>
							))}
							</ul>
						
						<div> { story.attributionText } </div>
					</div>
				)
				}
			</div>
		)
				
    }
}

Main.propTypes = {
    fetchData: PropTypes.func.isRequired,
    story: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        story: state.story,
        hasErrored: state.storyHasErrored,
        isLoading: state.storyIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(storyFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
