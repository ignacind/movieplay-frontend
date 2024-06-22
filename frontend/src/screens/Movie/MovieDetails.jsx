import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieDetails = ({ route }) => {
    const { movie } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: movie.posterImageLink }}
                alt={movie.title}
                style={styles.poster}
                resizeMode="cover"
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.description}>{movie.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#03152D',
    },
    poster: {
        width: '100%',
        height: 300,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FAFAFA',
        marginVertical: 16,
    },
    description: {
        fontSize: 16,
        color: '#FAFAFA',
    },
});

export default MovieDetails;
