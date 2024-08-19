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

export const Task = ({data, id, onPress}) => {
  const [tasks, setTasks] = useState(data);
  const {mainTask, subTasks} = tasks || {};
  const color = mainTask?.color || useRef(getRandomColor()).current;

  const setMainTaskData = () => {
    updateStatus({
      mainTask,
      documentId: id,
      subTasks,
      color,
      setTasks,
      favorite: data?.favorite,
    });
  };

  const setSubTaskData = index => {
    updateStatus({
      mainTask,
      selectedIndex: index,
      documentId: id,
      subTasks,
      color,
      setTasks,
      favorite: data?.favorite,
    });
  };

  const mainTaskBorderColor = getBorderColor(mainTask.date, mainTask.status);

  const mainTaskRender = () => (
    <View style={styles.mainTaskParent}>
      {mainTask.status ? (
        <Image source={Icons.check} />
      ) : (
        <Button
          containerStyle={[styles.mainTaskCircle, mainTaskBorderColor]}
          variant="manualDraw"
          onPress={setMainTaskData}
        />
      )}
      <View style={styles.mainTaskTitleDate}>
        <Text
          value={mainTask.title}
          numberOfLines={1}
          ellipsizeMode={'tail'}
          isLineThrough={mainTask.status}
        />
        <Text value={mainTask?.date} variant="subHead" />
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
          {mainTask.status || item.status ? (
            <Image source={Icons.check} />
          ) : (
            <Button
              onPress={() => {
                setSubTaskData(index);
              }}
              containerStyle={[
                styles.subTaskCircle,
                mainTask.status
                  ? mainTaskBorderColor
                  : mainTask?.date && getDateDifference(mainTask?.date) < 0
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
              isLineThrough={mainTask.status || item.status}
            />
          </View>
        </View>
      )}
    />
  );

  return (
    <TouchableOpacity
      style={[styles.container, {...getShadow(color)}]}
      onPress={onPress}>
      <View style={[styles.leftBlock, {backgroundColor: color}]}>
        {data.favorite ? (
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
