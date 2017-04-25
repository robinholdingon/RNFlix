import React from 'react'
import {
	View,
	StyleSheet,
	Text,
	ListView,
	ActivityIndicator,
	TouchableOpacity,
	RefreshControl,
} from 'react-native'
import * as api from './api'
import MovieCell from './MovieCell'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centering: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

class TopRatedMovies extends React.Component {
	static propTypes = {
		onSelectMovie: React.PropTypes.func.isRequired,
	}
	state = {
		refreshing: false,
		isLoading: false,
		isEmpty: false,
		dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
	}
	_onRefresh() {
	    this.setState({refreshing: true});
	    this.fetchMovies()
	 }
	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.container, styles.centering}>
					<ActivityIndicator/>
				</View>
			)
		} else if (this.state.isEmpty) {
			return (
				<View style={styles.container, styles.centering}>
					<Text>No results found.</Text>
				</View>
			)
		}
		return (
			<ListView 
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>
				}
				style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={row => (
					<TouchableOpacity onPress={() => this.props.onSelectMovie(row)}>
						<MovieCell movie={row} />
					</TouchableOpacity>
				)}
			/>
		)
	}

	updateRows(rows) {
		this.setState({
			isLoading: false,
			isEmpty: rows.length === 0,
			dataSource: this.state.dataSource.cloneWithRows(rows),
		})
	}
	componentDidMount() {
		this.fetchMovies();
	}
	fetchMovies() {
		this.setState({ isLoading: true })
		api.fetchTopRatedMovies()
		.then(results => {
			this.updateRows(results)
			this.setState({refreshing: false})
			}
		)
		.catch(error => {
			this.setState({ isLoading: false })
			console.error(error)
		})
	}
}

export default TopRatedMovies;