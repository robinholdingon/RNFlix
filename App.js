import React from 'react'
import {
	View,
	StyleSheet,
	Text,
	ListView,
} from 'react-native'
import * as api from './api'

const styles = StyleSheet.create({
	container: {
		flex: 1,

	}
})

class App extends React.Component {
	state = {
		dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
	}
	render() {
		return (
			<ListView 
				style={styles.container}
				dataSource={this.state.dataSource}
				renderRow={row => <Text>{row.title}</Text>}
			/>
		)
	}

	updateRows(rows) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(rows),
		})
	}
	componentDidMount() {
		api.fetchMovies()
			.then(results => this.updateRows(results))
			.catch(error => console.error(error))
	}
}

export default App;