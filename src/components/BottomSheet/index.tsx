import React, { useState } from 'react';
import { Actionsheet } from 'native-base';
import { BottomSheetProps, ChosenCategoryType } from './types';
import { styles } from './styles';
import AllCategories from './AllCategories';
import AddNewTask from './AddNewTask';

export default function BottomSheetComponent({ onClose, isOpen, backgroundStyle, respData, fetchTasksSummary }: BottomSheetProps) {
    const [chosenCategory, setChosenCategory] = useState<ChosenCategoryType>({
        id: 'EDUCATIONAL',
        label: 'Educational',
    });

    const [renderItem, setRenderItem] = useState<'AllCategories' | 'AddNewTask'>('AllCategories');

    const handleRenderItem = (item: 'AddNewTask' | 'AllCategories') => {
        setRenderItem(item);
    };

    const handleClose = () => {
        onClose();
        setRenderItem('AllCategories');
    };

    return (
        <Actionsheet isOpen={isOpen} onClose={handleClose}>
            <Actionsheet.Content style={[styles.container, { backgroundColor: backgroundStyle.secondary }]}>
                {
                    renderItem === 'AllCategories' ? (
                        <AllCategories backgroundStyle={backgroundStyle} onClose={onClose} setRenderItem={handleRenderItem} setChosenCategory={setChosenCategory}/>
                    ) : renderItem === 'AddNewTask' ? (
                        <AddNewTask respData={respData} backgroundStyle={backgroundStyle} setRenderItem={setRenderItem} onClose={onClose} category={chosenCategory} fetchTasksSummary={fetchTasksSummary}/>
                    ) : null
                }
            </Actionsheet.Content>
        </Actionsheet>
    );
}
