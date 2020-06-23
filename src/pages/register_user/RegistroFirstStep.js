import React, { Component } from 'react'
import {
  Animated,
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
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor } from '../../../colors';
import { PREGNANTIMAGE, BACKGROUNDPREGNANTIMAGE, BACKGROUNDPREGNANTIMAGESEMFUNDO, LOGOIMAGE } from '../../../images'
import { 
    cepPlaceholder, 
    saudacaoStep1, 
    nomeCompletoLabel, 
    nomeCompletoPlaceholder, 
    cepLabel, 
    idadePlaceholder, 
    idadeLabel, 
    bairroLabel, 
    bairroPlaceholder, 
    logradouroLabel, 
    numCasaLabel ,
    logradouroPlaceholder,
    numCasaPlaceholder,
    avancarButtonLabel
} from '../../../strings';

export default class RegistroFirstStep extends Component {
  
  static navigationOptions = {
    headerTitle: 'Olá, mamãe!'
  }
  
  constructor(props) {
    super(props)

    this.state = {
        fullname: ""
    }
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
            <View style={styles.containerContent}>
                <Text style={styles.saudacaoStyle}>{saudacaoStep1}</Text>
                <View style={styles.containerTextInput}>
                    <Text>{nomeCompletoLabel}</Text>
                    <TextInput
                        textColor={black}
                        tintColor={black}
                        baseColor={black}
                        style={styles.text}
                        placeholder={nomeCompletoPlaceholder}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Text>{idadeLabel}</Text>
                    <TextInput
                        textColor={black}
                        tintColor={black}
                        baseColor={black}
                        style={styles.text}
                        placeholder={idadePlaceholder}
                        keyboardType={'numeric'}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Text>{cepLabel}</Text>
                    <TextInput
                        textColor={black}
                        tintColor={black}
                        baseColor={black}
                        style={styles.text}
                        keyboardType={'numeric'}
                        placeholder={cepPlaceholder}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Text>{bairroLabel}</Text>
                    <TextInput
                        textColor={black}
                        tintColor={black}
                        baseColor={black}
                        style={styles.text}
                        placeholder={bairroPlaceholder}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={{minHeight: 30, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <View style={[styles.containerTextInput, {marginEnd: 8}]}>
                            <Text>{logradouroLabel}</Text>
                            <TextInput
                                textColor={black}
                                tintColor={black}
                                baseColor={black}
                                style={styles.text}
                                placeholder={logradouroPlaceholder}
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View style={[styles.containerTextInput, {marginStart: 8}]}>
                            <Text>{numCasaLabel}</Text>
                            <TextInput
                                textColor={black}
                                tintColor={black}
                                baseColor={black}
                                style={styles.text}
                                keyboardType={'numeric'}
                                placeholder={numCasaPlaceholder}
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => {
                        this.props.navigation.navigate('RegistroSecondStep')
                    }}
                    style={{height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 24}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: white}}>{avancarButtonLabel}</Text>
                    </TouchableOpacity>
            </View>
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
  containerContent: {
    flex: 1,
    padding: 16
  },
  containerTextInput: {
    minHeight: 30,
    borderBottomWidth: 2,
    marginTop: 16
  },
  fundoImage: {
    height: '100%'
  },
  saudacaoStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: fontColor
  },
});
