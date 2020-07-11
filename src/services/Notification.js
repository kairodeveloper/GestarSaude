import PushNotification from 'react-native-push-notification';

export default {

    configure() {

        PushNotification.configure({ // método para quando chamar uma notificação
            onNotification(notification) { // recomendação de formato para função dentro de objeto

                console.log('Notificação recebida', notification);
            }
        });

        return PushNotification;

    }
};
