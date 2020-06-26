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
  numCasaLabel,
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
      nome: "",
      idade: "",
      cep: "",
      bairro: "",
      logradouro: "",
      num_casa: ""
    }
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.containerContent}>
            <Text style={styles.saudacaoStyle}>{saudacaoStep1}</Text>
            <Text style={styles.textOverField}>{nomeCompletoLabel}</Text>
            <View style={styles.containerTextInput}>
              <TextInput
                textColor={black}
                tintColor={black}
                baseColor={black}
                style={styles.text}
                placeholder={nomeCompletoPlaceholder}
                value={this.state.nome}
                onChangeText={(nome) => this.setState({ nome })}
              />
            </View>

            <Text style={styles.textOverField}>{idadeLabel}</Text>
            <View style={styles.containerTextInput}>
              <TextInput
                textColor={black}
                tintColor={black}
                baseColor={black}
                style={styles.text}
                placeholder={idadePlaceholder}
                keyboardType={'numeric'}
                value={this.state.idade}
                onChangeText={(idade) => this.setState({ idade })}
              />
            </View>
            <Text style={styles.textOverField}>{cepLabel}</Text>
            <View style={styles.containerTextInput}>
              <TextInput
                textColor={black}
                tintColor={black}
                baseColor={black}
                style={styles.text}
                keyboardType={'numeric'}
                placeholder={cepPlaceholder}
                value={this.state.cep}
                onChangeText={(cep) => this.setState({ cep })}
              />
            </View>
            <Text style={styles.textOverField}>{bairroLabel}</Text>
            <View style={styles.containerTextInput}>
              <TextInput
                textColor={black}
                tintColor={black}
                baseColor={black}
                style={styles.text}
                placeholder={bairroPlaceholder}
                value={this.state.bairro}
                onChangeText={(bairro) => this.setState({ bairro })}
              />
            </View>
            <View style={{ minHeight: 30, flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.textOverField}>{logradouroLabel}</Text>
                <View style={[styles.containerTextInput, { marginEnd: 8 }]}>
                  <TextInput
                    textColor={black}
                    tintColor={black}
                    baseColor={black}
                    style={styles.text}
                    placeholder={logradouroPlaceholder}
                    value={this.state.logradouro}
                    onChangeText={(logradouro) => this.setState({ logradouro })}
                  />
                </View>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.textOverField}>{numCasaLabel}</Text>
                <View style={[styles.containerTextInput, { marginStart: 8 }]}>
                  <TextInput
                    textColor={black}
                    tintColor={black}
                    baseColor={black}
                    style={styles.text}
                    keyboardType={'numeric'}
                    placeholder={numCasaPlaceholder}
                    value={this.state.num_casa}
                    onChangeText={(num_casa) => this.setState({ num_casa })}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                let user = {}
                user.nome = this.state.nome
                user.idade = this.state.idade
                user.cep = this.state.cep
                user.bairro = this.state.bairro
                user.logradouro = this.state.logradouro
                user.num_casa = this.state.num_casa

                this.props.navigation.navigate('RegistroSecondStep', {user: user})
              }}
              style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary, marginTop: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>{avancarButtonLabel}</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
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
    marginTop: 6,
    paddingStart: 6,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: white
  },
  textOverField: {
    marginTop: 16,
    fontSize: 16,
    color: fontColor
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
