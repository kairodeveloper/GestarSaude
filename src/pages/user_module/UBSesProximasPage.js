import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    Alert,
    Image,
    Dimensions,
    ToastAndroid,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Platform,
    StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor, pink, blue } from '../../../colors';
import { ICONGIRL, ICONBOY, BACKGROUNDPREGNANTIMAGESEMFUNDO, MAPAPIAUI, ICONCLOSE, ICONTARGET } from '../../../images'
import {
    saudacaoStep3
} from '../../../strings';
import { NavigationActions, StackActions } from 'react-navigation';
import { getNextMid, saveThis } from '../../../realm_services/RealmService'
import { ScrollView } from 'react-native-gesture-handler';
import { getRegiaoData } from '../../global_components/GlobalFunctions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const LAT_DELTA = 0.0100
const LON_DELTA = 0.0061

export default class UBSesProximasPage extends Component {

    static navigationOptions = {
        headerTitle: 'Hospitais próximos'
    }

    constructor(props) {
        super(props)
        const { navigation } = this.props
    
        let region = {
            latitude: 37.4219983,
            longitude: -122.084,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LON_DELTA
        }

        this.state = {
            region: region,
            location: {},
            markers: []
        }
    }

    async componentDidMount() {
        try {
            let location = await this.requestLocation()
            let region = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LON_DELTA
            }                

            this.setState({
                region: region,
                location: location
            })

        } catch (error) {
            const { code, message } = ex;
                
            if (code === 'CANCELLED') {
                Alert.alert('Localização cancelada pelo usuário ou por outra requisição');
            }
            if (code === 'UNAVAILABLE') {
                Alert.alert('Serviço de localização está indiponível ou desativada');
            }
            if (code === 'TIMEOUT') {
                Alert.alert('Solicitação de localização demorou demais');
            }
            if (code === 'UNAUTHORIZED') {
                Alert.alert('Autorização negada');
            }
        }
    }

    async requestLocation() {
        return await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 150000
        })
    }

    onRegionChange = (region) => {
        this.setState({region})
    }

    render() {
        
        return (
            <View style={styles.safeView}>
                <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
                <View style={styles.container}>
                    <MapView 
                        provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        customMapStyle={
                          [
                            {
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#242f3e"
                                }
                              ]
                            },
                            {
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#746855"
                                }
                              ]
                            },
                            {
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#242f3e"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative.locality",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#d59563"
                                }
                              ]
                            },
                            {
                              "featureType": "landscape",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#d59563"
                                }
                              ]
                            },
                            {
                              "featureType": "poi.medical",
                              "stylers": [
                                {
                                  "visibility": "on"
                                }
                              ]
                            },
                            {
                              "featureType": "poi.park",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#263c3f"
                                }
                              ]
                            },
                            {
                              "featureType": "poi.park",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#6b9a76"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#38414e"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#212a37"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#9ca5b3"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#746855"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#1f2835"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#f3d19c"
                                }
                              ]
                            },
                            {
                              "featureType": "transit",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#2f3948"
                                }
                              ]
                            },
                            {
                              "featureType": "transit.station",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#d59563"
                                }
                              ]
                            },
                            {
                              "featureType": "water",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#17263c"
                                }
                              ]
                            },
                            {
                              "featureType": "water",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#515c6d"
                                }
                              ]
                            },
                            {
                              "featureType": "water",
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#17263c"
                                }
                              ]
                            }
                          ]
                        }
                        style={styles.mapView}
                        showsUserLocation={true}
                    >
                            { this.state.markers.map((marker, i) => (
                                <Marker 
                                    coordinate={{
                                        latitude: this.state.region.latitude,
                                        longitude: this.state.region.longitude
                                    }}
                                />
                            ))}
                    </MapView>
                    <TouchableOpacity style={styles.buttonBackToHome}
                        onPress={() => {
                            let region = {
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                                latitudeDelta: LAT_DELTA,
                                longitudeDelta: LON_DELTA
                            }

                            this.setState({
                                region: region
                            })
                        }}
                    >
                        <Image source={ICONTARGET} style={{height: 24, width: 24}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeView: {
        paddingTop: Platform.OS === 'ios' ? 44 : 0,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        backgroundColor: colorFundo,
    },
    mapView: {
        flex: 1
    },
    buttonBackToHome: {
        height: 50, 
        width: 50, 
        position: 'absolute', 
        bottom: 16, 
        right: 16, 
        backgroundColor: colorPrimary, 
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerContent: {
        flex: 1,
        padding: 16
    },
    containerTextInput: {
        minHeight: 30,
        marginTop: 6,
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: white
    },
    containerModal: {
        flex: 1,
        backgroundColor: blackSemiTransparent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContentModal: {
        height: '60%',
        width: '75%',
        backgroundColor: white,
        borderRadius: 25,
        padding: 16
    },
    fundoImage: {
        height: '100%'
    },
    saudacaoStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: fontColor
    },
    textOverField: {
        marginTop: 16,
        fontSize: 16,
        color: fontColor
    }
});
