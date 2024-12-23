

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PostSkeleton() {
    const shimmerValue = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        const shimmerAnimation = Animated.loop(
            Animated.timing(shimmerValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        shimmerAnimation.start();
        return () => shimmerAnimation.stop();
    }, [shimmerValue]);

    const shimmerStyle = {
        transform: [
            {
                translateX: shimmerValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Header Skeleton */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
                <View style={styles.textBlock}>
                    <View style={styles.line}>
                        <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                    </View>
                    <View style={[styles.line, { width: '50%' }]}>
                        <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                    </View>
                </View>
            </View>

            {/* Content Skeleton */}
            <View style={styles.contentBlock}>
                <View style={styles.line}>
                    <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
                <View style={[styles.line, { width: '80%' }]}>
                    <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
            </View>

            {/* Image Skeleton */}
            <View style={styles.imagePlaceholder}>
                <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
    },
    textBlock: {
        marginLeft: 10,
        flex: 1,
    },
    line: {
        height: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 7,
        marginVertical: 5,
        overflow: 'hidden',
    },
    contentBlock: {
        marginTop: 15,
    },
    imagePlaceholder: {
        marginTop: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 7,
        width: '100%',
        height: 300,
        overflow: 'hidden',
    },
    shimmerOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        opacity: 0.3,
    },
});
