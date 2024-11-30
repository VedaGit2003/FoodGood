import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

const CachedImage = ({ uri, style, ...rest }) => {
  const [cachedSource, setCachedSource] = useState(null);

  useEffect(() => {
    const formatBase64Data = (base64Data) => {
      return `data:image/jpeg;base64,${base64Data.split(',')[1]}`;
    };

    const getCachedImage = async () => {
      try {
        // console.log('Fetching image:', uri);

        let cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          if (!cachedImageData.startsWith('data:image/')) {
            // console.warn('Corrupt cached data. Clearing...');
            await AsyncStorage.removeItem(uri);
          } else {
            // console.log('Using cached image:', cachedImageData);
            setCachedSource({ uri: cachedImageData });
            return;
          }
        }

        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error('Image fetch failed');
        }
        const blob = await response.blob();
        console.log('Blob data:', blob);

        const base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result);
        });

        const formattedBase64Data = formatBase64Data(base64Data);
        await AsyncStorage.setItem(uri, formattedBase64Data);
        // console.log('Image cached successfully');
        setCachedSource({ uri: formattedBase64Data });
      } catch (error) {
        // console.error('Error Caching Image:', error);
        setCachedSource({ uri }); // Fallback to original URI
      }
    };

    if (uri) {
      getCachedImage();
    }
  }, [uri]);

  return (
    <Animated.Image source={cachedSource} style={style} {...rest} />
  );
};

export default CachedImage;
