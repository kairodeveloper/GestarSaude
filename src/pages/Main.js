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

export default class Main extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
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
                                      this.props.navigation.navigate('RegisterFirstStep')
                                    }}>
                    <Text style={styles.textButton}>SOU GESTANTE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { marginTop: 6}]}>
                    <Text style={styles.textButton}>SOU PROFISSIONAL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { marginBottom: 6}]}
                                    onPress={() => {
                                      this.props.navigation.navigate('SyndromeDefinition')
                                    }}>
                    <Text style={styles.textButton}>TESTE</Text>
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
    borderColor: blackSemiTransparent,
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
