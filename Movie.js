import React from 'react'
import {
	View,
	Image,
	StyleSheet,
	Text,
	ListView,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native'
import * as api from './api'
import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
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
		flex: 1,
	},
})
const Movie = ({ movie }) => (
	<View style={styles.container}>
		<Image 
			style={styles.poster} 
			resizeMethod="resize"
			source={{ uri: api.getBackdropPath(movie.backdrop_path) }} 
			resizeMode='contain'/>
		<Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
		<Text style={styles.overview} numberOfLines={5}>{movie.overview}</Text>
	</View>
)
Movie.propTypes = {
	movie: React.PropTypes.object.isRequired,
}
export default Movie