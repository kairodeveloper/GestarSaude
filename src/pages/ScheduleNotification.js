import React from 'react';

import { View, Button } from "react-native";

import Notification from "../services/Notification";

const ScheduleNotification = () => {

    const handleClick = () => {

        const date = new Date();

        date.setDate(8);
        date.setMonth(6);
        date.setFullYear(2020);
        date.setHours(12);
        date.setMinutes(27);
        date.setSeconds(0);

        Notification
            .configure()
            .localNotificationSchedule({ // notificação agendada
                message: 'Nova Notificação',
                date: date
            });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Button onPress={handleClick}
                title="Notificar"
            />
        </View>
    );
}

export default ScheduleNotification;
