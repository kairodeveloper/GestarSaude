import React from 'react';

import { View, Button } from "react-native";

import Notification from "../services/Notification";

const ScheduleNotification = () => {

    const handleClick = () => {

        console.log("Atual ", Date.now());
        const date2 = new Date("2020-07-07T16:25:00");
        console.log("Improvisada ", date2);

        Notification
            .configure()
            .localNotificationSchedule({ // notificação agendada
                message: 'Nova Notificação',
                // date: new Date(Date.now() + 120 * 1000)
                date: new Date("2020-07-07T16:25:00")
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
