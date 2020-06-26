import React, { Component, AsyncStorage } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey } from '../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE } from '../../images'
import { removeAll, isEmpty } from '../../realm_services/RealmService';
import { saveExames } from '../global_components/GlobalFunctions';

export default class Main extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    //removeAll()
    saveExames()
  }

  render() {
    return (
        <View style={styles.safeView}>
          <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
          <View style={styles.container}>
            <ImageBackground source={BACKGROUNDPREGNANTIMAGESEMFUNDO} style={styles.fundoImage}>
              <View style={styles.containerContent}>
                <Image source={LOGOIMAGE} style={styles.logoImage} />
                <View style={styles.containerButtons}>
                  <TouchableOpacity style={[styles.button, { marginBottom: 6}]}
                                    onPress={() => {
                                      if (isEmpty('Usuario')) {
                                        this.props.navigation.navigate('RegisterFirstStep')
                                      } else {
                                        this.props.navigation.navigate('UserMainPage')
                                      }
                                    }}>
                    <Text style={styles.textButton}>SOU GESTANTE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { marginBottom: 6}]}
                                    onPress={() => {
                                      this.props.navigation.navigate('ConsultationSchedules')
                                    }}>
                    <Text style={styles.textButton}>SOU PROFISSIONAL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
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
    backgroundColor: colorFundo
  },
  fundoImage: {
    height: '100%'
  },
  containerContent: {
    flex: 1,
    alignItems: 'center'
  },
  logoImage: {
    height: 100,
    width: 229,
    marginTop: 56,
    marginBottom: 56
  },
  containerButtons: {
    flex: 1,
    width: '100%',
    marginBottom: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 60,
    borderWidth: 3,
    borderColor: colorPrimaryDark,
    width: '90%',
    backgroundColor: colorPrimary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white
  }
});
