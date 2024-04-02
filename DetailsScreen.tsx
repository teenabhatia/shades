import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const { width, height } = Dimensions.get('window');

const DetailsScreen: React.FC<Props> = ({ route }) => {
  console.log('DetailsScreen route params:', route.params);

  const imageUrl = route.params?.imageUrl || 'Default_Image_URL';
  const title = route.params?.title || 'Default Title';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: height / 2, 
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default DetailsScreen;
