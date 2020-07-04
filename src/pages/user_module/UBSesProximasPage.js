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
                                  "stylers": [
                                    {
                                      "visibility": "on"
                                    },
                                    {
                                      "weight": 2.5
                                    }
                                  ]
                                },
                                {
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#ebe3cd"
                                    }
                                  ]
                                },
                                {
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#523735"
                                    }
                                  ]
                                },
                                {
                                  "elementType": "labels.text.stroke",
                                  "stylers": [
                                    {
                                      "color": "#f5f1e6"
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
                                  "featureType": "administrative",
                                  "elementType": "geometry.stroke",
                                  "stylers": [
                                    {
                                      "color": "#c9b2a6"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "administrative.land_parcel",
                                  "elementType": "geometry.stroke",
                                  "stylers": [
                                    {
                                      "color": "#dcd2be"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "administrative.land_parcel",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#ae9e90"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "landscape",
                                  "stylers": [
                                    {
                                      "visibility": "on"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "landscape.natural",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#dfd2ae"
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
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#dfd2ae"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#93817c"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi.attraction",
                                  "stylers": [
                                    {
                                      "visibility": "off"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi.business",
                                  "stylers": [
                                    {
                                      "visibility": "off"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi.medical",
                                  "stylers": [
                                    {
                                      "visibility": "on"
                                    },
                                    {
                                      "weight": 4.5
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi.park",
                                  "elementType": "geometry.fill",
                                  "stylers": [
                                    {
                                      "color": "#a5b076"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "poi.park",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#447530"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road",
                                  "stylers": [
                                    {
                                      "visibility": "on"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#f5f1e6"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.arterial",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#fdfcf8"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.highway",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#f8c967"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.highway",
                                  "elementType": "geometry.stroke",
                                  "stylers": [
                                    {
                                      "color": "#e9bc62"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.highway.controlled_access",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#e98d58"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.highway.controlled_access",
                                  "elementType": "geometry.stroke",
                                  "stylers": [
                                    {
                                      "color": "#db8555"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "road.local",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#806b63"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "transit",
                                  "stylers": [
                                    {
                                      "visibility": "off"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "transit.line",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#dfd2ae"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "transit.line",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#8f7d77"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "transit.line",
                                  "elementType": "labels.text.stroke",
                                  "stylers": [
                                    {
                                      "color": "#ebe3cd"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "transit.station",
                                  "elementType": "geometry",
                                  "stylers": [
                                    {
                                      "color": "#dfd2ae"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "water",
                                  "elementType": "geometry.fill",
                                  "stylers": [
                                    {
                                      "color": "#b9d3c2"
                                    }
                                  ]
                                },
                                {
                                  "featureType": "water",
                                  "elementType": "labels.text.fill",
                                  "stylers": [
                                    {
                                      "color": "#92998d"
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
