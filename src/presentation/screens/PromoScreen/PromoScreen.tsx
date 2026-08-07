import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Pressable, Text, View } from 'react-native';
import { styles } from './PromoScreen.style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../app/navigation/navigationRef';

export const PromoScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Promo'>>();

  const navigation = useAppNavigation();

  const { id } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headline}>Promo</Text>

        <Text style={styles.text}>Promo id: {id}</Text>

        <Pressable onPress={navigation.goBack} style={styles.button}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
