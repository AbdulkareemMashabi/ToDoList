import {View} from 'react-native';
import EmptyList from '../../../Components/EmptyList/EmptyList';
import {Images} from '../../../assets/Images';

import styles from '../Dashboard.styles';

import {Icons} from '../../../assets/Icons';
import {navigate, pagesNames} from '../../../helpers/utils';
import {useSelector} from 'react-redux';
import Button from '../../../Components/Button/Button';

export const EmptyComponent = () => {
  const {token} = useSelector(state => state.main);

  return (
    <View style={styles.flex_1}>
      <EmptyList
        image={Images.emptyListPic}
        title={'myWishesPage.emptyFormTitle'}
        description={'myWishesPage.emptyFormTDescription'}
      />
      <Button
        containerStyle={[styles.button, styles.plusButton]}
        source={Icons.plus}
        onPress={() => {
          if (token) navigate(pagesNames.createNewTask);
          else
            navigate(pagesNames.login, {
              fromDashboard: true,
            });
        }}
      />
    </View>
  );
};

export default EmptyComponent;
