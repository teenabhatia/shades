import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import sanityClient from './sanityClient';
import { ITile } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types'; 

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const { height, width } = Dimensions.get('window');

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [tiles, setTiles] = useState<ITile[]>([]);

    const [likedTiles, setLikedTiles] = useState<{ [key: string]: boolean }>({});


    const toggleLike = (id: string) => {
        setLikedTiles({
            ...likedTiles,
            [id]: !likedTiles[id],
        });
    };



    interface TabItemProps {
        icon: string; 
        label: string;
        isActive: boolean;
    }

    const TabItem: React.FC<TabItemProps> = ({ icon, label, isActive }) => {
        return (
            <View style={styles.tabItemContainer}>
                <Text style={[styles.tabIcon, isActive && styles.activeTabIcon]}>{icon}</Text>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</Text>
                {isActive && <View style={styles.activeTabIndicator} />}
            </View>
        );
    };

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "tile"]{
        ...,
        "imageUrl": image19_5x9.asset->url
      }`)
            .then((data: ITile[]) => {
                setTiles(data);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <FlatList
                data={tiles}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Details', { 
                                tileId: item._id, 
                                imageUrl: item.imageUrl, 
                                title: item.title
                            })}
                        >
                            <View style={styles.tile}>
                                {item.imageUrl && (
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                                <LinearGradient
                                    colors={['transparent', 'black', 'black', 'black']}
                                    locations={[0.45, 0.92, 0.96, 1]}
                                    style={styles.gradient}
                                >
                                    <View style={styles.titleContainer}>
                                        <View style={styles.whiteBackground}>
                                            <Text style={styles.title}>{item.title}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.summary}>{item.summary}</Text>

                                    <TouchableOpacity
                                        style={[styles.likeButton, likedTiles[item._id] ? styles.likedButton : {}]}
                                        onPress={() => toggleLike(item._id)}
                                    >
                                        <Text style={styles.likeButtonText}>+</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.shareButton} >
                                        <Text style={styles.shareButtonText}>⤴</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id}
                pagingEnabled
                horizontal={false}
                showsVerticalScrollIndicator={false}
                snapToInterval={height - tabBarHeight}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
            />
            <View style={styles.tabBar}>
                <TabItem icon="🏠" label="Home" isActive={true} />
                <TabItem icon="🔍" label="Search" isActive={false} />
                <TabItem icon="👤" label="Me" isActive={false} />
                <TabItem icon="🎮" label="Games" isActive={false} />
                <TabItem icon="⚙️" label="Settings" isActive={false} />
            </View>
        </>
    );
};

const tabBarHeight = 60;
const styles = StyleSheet.create({
    tile: {
        height: height - tabBarHeight,
        width: width,
    },
    image: {
        width: width,
        height: height - tabBarHeight,
    },

    titleContainer: {
        position: 'absolute',
        top: height * 0.40,
        left: 15,
        bottom: 0,
        right: 0,

    },
    purpleBackground: {
        backgroundColor: '#9B77FE', 
        position: 'absolute',
        top: 18, 
        left: -7,
        paddingHorizontal: 0, 
        paddingVertical: 4,

    },
    whiteBackground: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignSelf: 'flex-start',
        shadowColor: '#9B77FE', 
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 100,
        shadowRadius: 3,
        elevation: 5, 
    },
    title: {
        fontSize: 18, 
        fontWeight: '600',
        color: 'black',
    },
    likeButton: {
        position: 'absolute',
        bottom: 40, 
        right: 70, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 25, 
        borderWidth: 1, 
        borderColor: 'grey', 
        width: 40, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1,
    },
    likeButtonText: {
        fontSize: 38,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        bottom: 6,
        left: 0.5,
    },
    likedButton: {
        backgroundColor: '#9B77FE', 
        borderColor: 'transparent', 
    },
    shareButton: {
        position: 'absolute',
        bottom: 40, 
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 25, 
        borderWidth: 1, 
        borderColor: 'grey', 
        width: 40, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    shareButtonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        bottom: 0,
        left: 2,
    },
    summary: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        bottom: 115, 
        left: 15,
        right: 10, 
        textAlign: 'left',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0, 
        left: 0,
        right: 0,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        paddingBottom: 3,
        height: tabBarHeight, 
    },

    tabItemContainer: {
        alignItems: 'center',
        bottom: 30,
    },
    tabIcon: {
        fontSize: 24,
        color: 'grey',
    },
    activeTabIcon: {
        color: 'white', 
    },
    tabLabel: {
        fontSize: 10,
        color: 'grey',
        marginTop: 4,
    },
    activeTabLabel: {
        color: 'white', 
    },
    activeTabIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: '100%',
        backgroundColor: 'purple', 
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 1.5, 
    },
});

export default HomeScreen;
