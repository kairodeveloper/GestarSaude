import React from 'react';

import { View, Button } from "react-native";

import Notification from "../services/Notification";

const ScheduleNotification = () => {

    const handleClick = () => {

        Notification
            .configure()
            .localNotificationSchedule({ // notificação agendada
                message: 'Nova Notificação',
                date: new Date(Date.now() + 10000)
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
