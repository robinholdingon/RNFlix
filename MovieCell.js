import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
} from 'react-native'
import * as api from './api'
import ProgressiveImage from './ProgressiveImage'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		borderWidth: 1,
		borderColor: 'rgb(200, 200, 200)',
	},
	textContainer: {
		marginLeft: 5,
		marginRight: 5,
		flex: 1,
		justifyContent: 'space-between',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	overview: {
		color: 'rgb(150, 150, 150)',
		fontSize: 12,
	},
	poster: {
		width: 100,
		height: 100,
	},
})
const MovieCell = ({ movie }) => (
	<View style={styles.container}>
		<ProgressiveImage 
			style={styles.poster} 
			resizeMethod="resize"
			sourceHigh={{ uri: api.getPosterUrlHigh(movie.poster_path) }} 
			sourceLow={{ uri: api.getPosterUrlLow(movie.poster_path) }} 
			resizeMode='contain'/>
		<View style={styles.textContainer}>
			<Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
			<Text style={styles.overview} numberOfLines={5}>{movie.overview}</Text>
		</View>
	</View>
)
MovieCell.propTypes = {
	movie: React.PropTypes.object.isRequired,
}
export default MovieCell