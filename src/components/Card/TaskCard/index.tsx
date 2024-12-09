import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TaskCardProps } from './types';
import { styles } from './styles';
import { ExtractTime } from '../../../utils/ExtractTime';
import { ExtractDay } from '../../../utils/ExtractDay';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon } from '../../../utils/ExtractIcon';
import { updateTask } from '../../../database/api/UpdateTask';
import { database } from '../../../database';
import { TaskType } from '../../../screens/HomeScreen/type';
import { deleteTask } from '../../../database/api/DeleteTask';
import DialogModal from '../../Dialog';

export default function TaskCard({ backgroundStyle, task }: TaskCardProps) {
    const [openModal, setOpenModal] = React.useState(false);

    const handlePress = async (task: TaskType) => {
        console.log('log/TaskCard/func: ', task.id);
        const updatedTask = {
            ...task,
            title: 'New Title',
            description: 'This is a new description',
        };

        try {
            await updateTask(database, task.id, updatedTask);
            console.log('Task updated!');
        } catch (error) {
            console.log('log/TaskCard/func: ', error);
        }
    };

    const handleDone = async () => {
        setOpenModal(true);
    };

    const handleConfirm = async () => {
        console.log('log/TaskCard/func: ', 'DONE');
        try {
            await deleteTask(database, task.id);
            console.log('Task deleted!');
        } catch (error) {
            console.log('log/TaskCard/func: ', error);
        }

    };

    return (
        <>
            <Pressable onPress={() => handlePress(task)} style={[styles.container, { backgroundColor: backgroundStyle.secondary }]}>
                <View style={styles.iconAndText}>
                    <View style={[styles.iconContainer, {
                        backgroundColor: backgroundStyle.primary,
                    }]}>
                        <Icon name={task.category} size={20} />
                    </View>
                    <View style={[{
                        backgroundColor: backgroundStyle.secondary,
                    }]}>
                        <Text style={[styles.headerText, { color: backgroundStyle.color }]}>{task.title}</Text>
                        <View style={styles.timestampText}>
                            <Text style={[styles.subHeaderText, { color: backgroundStyle.color }]}>{ExtractTime(task.dueTimeStamp)} </Text>
                            <Entypo name={'dot-single'} size={18} color={backgroundStyle.color} />
                            <Text style={[styles.subHeaderText, { color: backgroundStyle.color }]}>{task.allDay ? 'All Day' : ExtractDay(task.dueTimeStamp)}</Text>
                        </View>
                    </View>
                </View>
                <Pressable style={[styles.endContainer, { backgroundColor: backgroundStyle.primary }]} onPress={handleDone}>
                    <Text style={[{ color: backgroundStyle.color }]}>Done</Text>
                </Pressable>
            </Pressable>
            <DialogModal
                mode={'DELETE'}
                backgroundStyle={backgroundStyle}
                openModal={openModal}
                setOpenModal={setOpenModal}
                onConfirm={handleConfirm}
                onCancel={() => setOpenModal(false)}
                title={'Delete this task'}
                description={'Are you sure you want to permanently delete this task?'}
            />
        </>
    );
}
