import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../app/navigation/navigationRef';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { styles } from './PromoScreen.style';

export const PromoScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Promo'>>();

  const navigation = useAppNavigation();

  const { id } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headline}>Promo</Text>

        <Text style={styles.text}>Promo id: {id}</Text>

        <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
