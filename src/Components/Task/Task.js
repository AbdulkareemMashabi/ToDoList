import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './Task.style';
import Text from '../Text/Text';
import {Icons} from '../../assets/Icons';
import Button from '../Button/Button';
import {useState} from 'react';
import {
  getBackgroundColor,
  getBorderColor,
  getBorderColorSubTask,
  getDateDifference,
  getRandomColor,
  updateStatus,
} from './utils';
import {useDispatch} from 'react-redux';
import {backgroundColors} from '../../helpers/utils';
import {getShadow} from '../../helpers/shadow';

export const Task = ({data, id, userId, onPress}) => {
  const [tasks, setTasks] = useState(data);
  const {mainTask, subTasks} = tasks || {};

  const dispatch = useDispatch();

  const mainTaskBackgroundColor = getBackgroundColor(
    mainTask.date,
    mainTask.status,
  );
  const mainTaskBorderColor = getBorderColor(mainTask.date, mainTask.status);

  const color = getRandomColor();

  console.log(color);

  return (
    <TouchableOpacity
      style={[styles.container, {...getShadow(color)}]}
      onPress={onPress}>
      <View style={[styles.leftBlock, {backgroundColor: color}]} />
      <View
        style={[
          styles.taskSubTasksParent,
          {...mainTaskBackgroundColor, backgroundColor: 'white'},
        ]}>
        <View style={styles.mainTaskParent}>
          {mainTask.status ? (
            <Image source={Icons.check} />
          ) : (
            <Button
              containerStyle={[styles.mainTaskCircle, mainTaskBorderColor]}
              variant="manualDraw"
              onPress={() => {
                updateStatus({
                  mainTask: mainTask,
                  dispatch: dispatch,
                  documentId: id,
                  subTasks: subTasks,
                  userId,
                  setTasks,
                });
              }}
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
        {subTasks.length !== 0 ? <View style={styles.separator} /> : null}
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
                    updateStatus({
                      mainTask: mainTask,
                      selectedIndex: index,
                      dispatch: dispatch,
                      documentId: id,
                      subTasks: subTasks,
                      userId,
                      setTasks,
                    });
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
      </View>
    </TouchableOpacity>
  );
};

export default Task;
