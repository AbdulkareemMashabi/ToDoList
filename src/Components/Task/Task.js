import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './Task.style';
import Text from '../Text/Text';
import {Icons} from '../../assets/Icons';
import Button from '../Button/Button';
import {useRef, useState} from 'react';
import {
  getBorderColor,
  getBorderColorSubTask,
  getDateDifference,
  getRandomColor,
  updateStatus,
} from './utils';
import {backgroundColors} from '../../helpers/utils';
import {getShadow} from '../../helpers/shadow';

export const Task = ({item, onPress}) => {
  const [task, setTask] = useState(item);
  const {subTasks, favorite, status, date, title, color} = task || {};
  const mainTaskColor = color || useRef(getRandomColor()).current;

  const setTaskStatus = index => {
    updateStatus({
      setTask,
      favorite,
      task,
      index,
    });
  };

  const mainTaskBorderColor = getBorderColor(date, status);

  const mainTaskRender = () => (
    <View style={styles.mainTaskParent}>
      {status ? (
        <Image source={Icons.check} />
      ) : (
        <Button
          containerStyle={[styles.mainTaskCircle, mainTaskBorderColor]}
          variant="manualDraw"
          onPress={() => {
            setTaskStatus();
          }}
        />
      )}
      <View style={styles.mainTaskTitleDate}>
        <Text
          value={title}
          numberOfLines={1}
          ellipsizeMode={'tail'}
          isLineThrough={status}
        />
        <Text value={date} variant="subHead" />
      </View>
    </View>
  );

  const subTasksRender = () => (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={subTasks || []}
      renderItem={({item, index}) => (
        <View style={styles.subTaskParent} key={index}>
          {status || item.status ? (
            <Image source={Icons.check} />
          ) : (
            <Button
              onPress={() => {
                setTaskStatus(index);
              }}
              containerStyle={[
                styles.subTaskCircle,
                status
                  ? mainTaskBorderColor
                  : date && getDateDifference(date) < 0
                  ? {borderColor: backgroundColors.red}
                  : getBorderColorSubTask(item?.status),
              ]}
              variant="manualDraw"
            />
          )}
          <View style={styles.subTaskTitleParent}>
            <Text
              value={item.title}
              numberOfLines={1}
              ellipsizeMode={'tail'}
              isLineThrough={status || item.status}
            />
          </View>
        </View>
      )}
    />
  );

  return (
    <TouchableOpacity
      style={[styles.container, {...getShadow(mainTaskColor)}]}
      onPress={onPress}>
      <View style={[styles.leftBlock, {backgroundColor: mainTaskColor}]}>
        {favorite ? (
          <Image
            source={Icons.filledStar}
            tintColor={'#dbdb07'}
            style={styles.imageSize}
          />
        ) : null}
      </View>
      <View style={styles.taskSubTasksParent}>
        {mainTaskRender()}
        {subTasks?.length !== 0 ? <View style={styles.separator} /> : null}
        {subTasksRender()}
      </View>
    </TouchableOpacity>
  );
};

export default Task;
