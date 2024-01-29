import {Image, View} from 'react-native';
import styles from './Task.style';
import Text from '../Text/Text';
import {Icons} from '../../assets/Icons';
import Button from '../Button/Button';
import {useState} from 'react';
import {getBackgroundColor, getBorderColor, updateStatus} from './utils';
import {useDispatch} from 'react-redux';

export const Task = ({data, id, userId}) => {
  const [tasks, setTasks] = useState(data);
  const {mainTask, subTasks} = tasks || {};

  const dispatch = useDispatch();

  const mainTaskBackgroundColor = getBackgroundColor(
    mainTask.date,
    mainTask.status,
  );
  const mainTaskBorderColor = getBorderColor(mainTask.date, mainTask.status);

  return (
    <View style={[styles.container]}>
      <View style={[styles.leftBlock, {...mainTaskBackgroundColor}]} />
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
            {mainTask?.date ? (
              <Text value={mainTask?.date} variant="subHead" />
            ) : null}
          </View>
        </View>
        {subTasks.length !== 0 ? <View style={styles.separator} /> : null}
        {subTasks.map((item, index) => {
          return (
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
                      : getBorderColor(item?.date, item?.status),
                  ]}
                  variant="manualDraw"
                />
              )}
              <View style={styles.subTaskTitleParent}>
                <Text
                  value={item.title}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  isLineThrough={item?.status}
                />
                {item?.date ? (
                  <Text value={item?.date} variant="subHead" />
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Task;
