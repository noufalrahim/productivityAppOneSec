import React, { useState } from 'react';
import { styles } from './styles';
import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddNewTaskProps } from './types';
import { Icon } from '../../../utils/ExtractIcon';
import { TextInput } from 'react-native-paper';
import DateCard from '../../Card/DateCard';
import TimeCard from '../../Card/TimeCard';
import { createTask } from '../../../database/api/CreateTask';
import { database } from '../../../database';
import { TimestampCreator } from '../../../utils/TimestampCreator';
export default function AddNewTask({ backgroundStyle, onClose, category, respData, fetchTasksSummary }: AddNewTaskProps) {
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAllDay, setIsAllDay] = React.useState(false);

    const handleAddTask = async () => {
        console.log('Add task');
        // const newTask: TaskType = {
        //     title: 'Buy health supplements',
        //     description: 'Buy health supplements from the pharmacy',
        //     allDay: false,
        //     dueTimeStamp: 1733328000, // Example timestamp
        //     completed: false,
        //     category: 'HEALTH', // One of the categories: EDUCATIONAL, HEALTH, HOUSE, WORK, PERSONAL
        // };
        // postTask(newTask).then(() => {
        //     console.log('Task and summary successfully updated');
        //     // fetchData();
        //     // fetchTasksSummary();
        //     // onClose();
        //   }).catch((error) => {
        //     console.log('Error inserting task and updating summary: ', error);
        // });
        if(!title) {
            console.log('Title is required');
            return;
        }
        else if(!date) {
            console.log('Date is required');
            return;
        }
        else if(!time) {
            console.log('Time is required');
            return;
        }
        else if(!category) {
            console.log('Category is required');
            return;
        }
        try {
            const titleOfTask = title;
            const descriptionOfTas = description;
            const dueTimeStampOfTask = TimestampCreator(date, time);
            const categoryOfTask = category.id;

            await createTask(database, titleOfTask, descriptionOfTas, dueTimeStampOfTask, categoryOfTask);
            console.log('Task and summary successfully updated');
        } catch (error) {
            console.log('Error inserting task and updating summary: ', error);
        }
        onClose();
    };

    return (
        <View style={styles.innerContainer}>
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={[{ color: backgroundStyle.color }, styles.headerText]}>New Task</Text>
                    <Text style={[{ color: backgroundStyle.color }, styles.subHeaderText]}>This task will be added to {category.label}</Text>
                </View>
                <Pressable style={[{ backgroundColor: backgroundStyle.primary }, styles.iconHeaderContainer]} onPress={onClose}>
                    <Ionicons name="close" size={20} color={backgroundStyle.color} />
                </Pressable>
            </View>
            <View style={styles.body}>
                <View style={styles.innerBodySection}>
                    <View style={[styles.iconBodyContainer, { backgroundColor: backgroundStyle.primary }]}>
                        <Icon name={category.id} size={40} />
                    </View>
                    <TextInput
                        mode="flat"
                        style={[{ backgroundColor: backgroundStyle.secondary }, styles.input]}
                        label="Title" underlineColor={backgroundStyle.primary}
                        activeUnderlineColor={backgroundStyle.primary}
                        cursorColor={backgroundStyle.primary}
                        textColor={backgroundStyle.color}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                </View>
                <View>
                    <TextInput
                        mode="flat"
                        style={[{ backgroundColor: backgroundStyle.secondary }, styles.textArea]}
                        label="Description (optional)" underlineColor={backgroundStyle.primary}
                        activeUnderlineColor={backgroundStyle.primary}
                        cursorColor={backgroundStyle.primary}
                        textColor={backgroundStyle.color}
                        multiline={true}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <DateCard backgroundStyle={backgroundStyle} date={date} setDate={setDate} open={openDate} setOpen={setOpenDate} isAllDay={isAllDay} setIsAllDay={setIsAllDay} />
                <TimeCard backgroundStyle={backgroundStyle} time={time} setTime={setTime} open={openTime} setOpen={setOpenTime} />
            </View>
            <Pressable onPress={handleAddTask}>
                <View style={[styles.button, { backgroundColor: backgroundStyle.color }]}>
                    <Text style={[styles.buttonText, { color: backgroundStyle.backgroundColor }]}>Add Task</Text>
                </View>
            </Pressable>
        </View>
    );
}
