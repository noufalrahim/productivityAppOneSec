import React, { useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import SemicircleProgressBar from '../../components/ArcProgressBar';
import TaskCard from '../../components/Card/TaskCard';
import AppBar from '../../components/AppBar';
import { TouchableRipple } from 'react-native-paper';
// import TASKDATA from '../../db/taskData.json';
// import CATEGORIES from '../../db/category.json';
import { TaskListType, TaskStatisticsType } from './type';
import { HomeScreenNavigationProp } from '../../navigators/type';
import { useDisclose } from 'native-base';
import BottomSheetComponent from '../../components/BottomSheet';
import { NativeModules } from 'react-native';
import { useTasks } from '../../hooks/useTasks';
import { useTasksSummary } from '../../hooks/useTasksSummary';

const { TrackedApps } = NativeModules;
function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
    const isDarkMode = useColorScheme() !== 'dark';
    const { isOpen, onOpen, onClose } = useDisclose();
    const [respData, setRespData] = useState<TaskListType>();
    // const [taskData, setTaskData] = React.useState<TaskType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const selectedApps = React.useMemo(() => [
        'com.whatsapp',       // WhatsApp
        'com.instagram.android', // Instagram
        'com.facebook.katana',   // Facebook
        'com.google.android.gm',
        'com.android.chrome',
    ], []);
    const [taskSatistics, setTaskSatistics] = React.useState<TaskStatisticsType>({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
    });
    const [progress, setProgress] = React.useState(0);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? theme.colors.black : theme.colors.white,
        color: isDarkMode ? theme.colors.lighter : theme.colors.darker,
        primary: isDarkMode ? theme.colors.dark : theme.colors.light,
        secondary: isDarkMode ? theme.colors.darker : theme.colors.lighter,
    };
    const taskData = useTasks();
    const taskSummaryData = useTasksSummary();

    console.log('taskSummaryData::', taskSummaryData);
    React.useEffect(() => {
        if (taskSummaryData.length > 0) {
            setTaskSatistics({
                totalTasks: taskSummaryData[0].total,
                completedTasks: taskSummaryData[0].completed,
                pendingTasks: taskSummaryData[0].pending,
            });
        }
    }, [taskSummaryData]);

    React.useEffect(() => {
        const updateTrackedApps = (apps: any) => {
            TrackedApps.updateTrackedApps(apps);
        };
        updateTrackedApps(selectedApps);
    }, [selectedApps]);

    React.useEffect(() => {
        const calculateProgress = () => {
            if (taskSatistics.totalTasks === 0) {
                setProgress(0);
            } else {
                const progressData = (taskSatistics.completedTasks / taskSatistics.totalTasks) * 100;
                setProgress(progressData);
            }
        };
        calculateProgress();
    }, [taskSatistics]);

    const fetchTasksSummary = async () => {
        return;
    };

    return (
        <View style={[backgroundStyle, styles.container]}>
            <AppBar backgroundStyle={backgroundStyle} title="" showBackButton={false} trailIcons={[{
                title: 'menu',
                onClick: () => navigation.navigate('SettingsScreen'),
            }]} />
            {
                isLoading ?
                    <View style={styles.loadingContainer}>
                        <Text style={{ color: backgroundStyle.color }}>Loading...</Text>
                    </View> :
                    (
                        <>
                            <ScrollView>
                                <SemicircleProgressBar progress={progress} statistics={taskSatistics} />
                                <View style={styles.taskContainer}>
                                    <View style={styles.headerContainer}>
                                        <Text style={[styles.text, { color: backgroundStyle.color }]}>Pending Tasks</Text>
                                        <View style={[styles.line, { backgroundColor: backgroundStyle.color }]} />
                                        <Text style={[styles.number, { color: backgroundStyle.color }]}>{taskSatistics.pendingTasks}</Text>
                                    </View>
                                    {taskData && taskData.map((task, index) => (
                                        <TaskCard key={index} backgroundStyle={backgroundStyle} task={task} />
                                    ))}
                                </View>
                            </ScrollView>
                            <View style={styles.footerContainer}>
                                <TouchableRipple style={styles.innerContainer} onPress={onOpen} rippleColor="rgba(0, 0, 0, .32)">
                                    <Text style={[styles.footerText, {
                                        color: backgroundStyle.primary,
                                    }]}>Add a New Task</Text>
                                </TouchableRipple>
                            </View>
                            <BottomSheetComponent respData={respData} onClose={onClose} isOpen={isOpen} backgroundStyle={backgroundStyle} fetchTasksSummary={fetchTasksSummary} />
                        </>
                    )
            }
        </View>
    );
}



export default HomeScreen;
