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
  StatusBar,
  FlatList
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorBrown, colorFundo, black, colorFundoSemiTransparente, blackSemiTransparent, white, colorGrey, fontColor, colorButtons, colorGreenDark } from '../../../colors';
import { ICONUP, ICONDOWN, ICONCHECKED, ICONCALENDAR, ICONHEARTSAUDAVEL, ICONHEARTRISCO } from '../../../images'
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
import { Container, Header, Content, Tab, Tabs } from 'native-base'
import { maskForDate } from '../../global_components/GlobalFunctions';

export default class UserMainPage extends Component {

  static navigationOptions = {
    headerTitle: 'Olá, mamãe!'
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let consultas = []
    let exames = []

    for (let index = 0; index < 10; index++) {
      let data = new Date()
      data.setDate(data.getDate() + 1)

      let consulta = {}
      consulta.mid = index + 1
      consulta.data = data
      consulta.peso = 70
      consulta.pressaoX = 120
      consulta.pressaoY = 80
      consulta.estado = 1

      consultas.push(consulta)
    }

    let trimestre1 = [
      "hemograma",
      "tipagem sanguinea e fator rh",
      "glicemia em jejum",
      "teste rápido diagnóstico HIV",
      "toxoplasmos",
      "sorologia para hepatite B (HbsAg)",
      "ultrassonografia obstétrica",
      "citopatológico de colo de útero"
    ]

    let trimestre2 = [
      "teste de tolerância para glicose com 75g"
    ]

    let trimestre3 = [
      "hemograma",
      "glicemia em jejum",
      "coombs indireto (se for Rh negativo)",
      "VDRL Anti-HIV",
      "sorologia para hepatite B (HbsAg)",
      "repetição toxoplasmose ",
      "urocultura + urina tipo I (sumário de urina – SU)",
      "bacterioscopia de secreção vaginal"
    ]

    let mid = 1
    trimestre1.map((it) => {
      exames.push({
        mid: mid,
        trimestre: 1,
        nome: it,
        feito: false
      })

      mid++
    })

    trimestre2.map((it) => {
      exames.push({
        mid: mid,
        trimestre: 2,
        nome: it,
        feito: false
      })

      mid++
    })

    trimestre3.map((it) => {
      exames.push({
        mid: mid,
        trimestre: 3,
        nome: it,
        feito: false
      })

      mid++
    })

    this.state = {
      fullname: "",
      consultas: consultas,
      exames: exames,
      showTrimestre1: false,
      rotationT1: '0deg',
      showTrimestre2: false,
      rotationT2: '0deg',
      showTrimestre3: false,
      rotationT3: '0deg'
    }
  }

  getEstadoByCodigo(estado) {
    if (estado == 1) {
      return "Saudável"
    } else if (estado == 2) {
      return "Risco (Pressão elevada)"
    } else {
      return "Risco (Pressão baixa)"
    }
  }

  getImageByCodigo(estado) {
    if (estado == 1) {
      return ICONHEARTSAUDAVEL
    } else {
      return ICONHEARTRISCO
    }
  }

  setExameFeito(mid) {
    let exames = this.state.exames

    exames.map((it) => {
      if (it.mid == mid) {
        it.feito = !it.feito
      }
    })

    this.setState({
      exames: exames
    })
  }

  getTableByTrimestre(trimestre) {
    let rows = []

    this.state.exames.map((it) => {
      if (it.trimestre == trimestre) {
        rows.push(
          <TouchableOpacity
            onPress={() => {
              this.setExameFeito(it.mid)
            }}
            style={{ minHeight: 60, marginBottom: 16, padding: 16, borderRadius: 15, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowOffset: 15, backgroundColor: white }}>
            <View flex={4}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>{it.nome}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              {it.feito ? (
                <Image source={ICONCHECKED} style={{ marginStart: 6, height: 27, width: 27 }} />
              ) : (
                  <View style={{ marginStart: 6, height: 25, width: 25, borderWidth: 2, borderRadius: 5 }} />
                )}
            </View>
          </TouchableOpacity>
        )
      }
    })

    return rows
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={{ height: 30, paddingStart: 16, backgroundColor: colorPrimary }}>
            <Text style={{ color: white, fontSize: 12, fontWeight: 'bold' }}>Você está na 4ª semana da sua gravidez</Text>
          </View>
          <Container>
            <Tabs
              initialPage={0}
              scrollWithoutAnimation={true}
            >
              <Tab heading="Evolução"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>

                <View style={styles.containerTabs}>
                  <Text style={styles.titleTab1}>Acompanhe aqui sua evolução</Text>
                  <View style={{ flex: 1, marginTop: 16 }}>

                    <FlatList
                      extraData={this.state}
                      data={this.state.consultas}
                      snapToAlignment={"center"}
                      flex={1}
                      renderItem={({ item }) =>
                        <View style={{ minHeight: 100, backgroundColor: white, elevation: 2, shadowOpacity: 10, borderRadius: 15, marginBottom: 16, paddingTop: 10, paddingBottom: 10, paddingStart: 6, paddingEnd: 6, justifyContent: 'center', marginRight: 6 }}>
                          <View style={{ height: 25, paddingStart: 6 }}>
                            <Text style={{ color: fontColor }}>{maskForDate(item.data)}</Text>
                          </View>
                          <View style={{ minHeight: 50, paddingStart: 6, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: fontColor }}>Peso: {item.peso}kg, Pressão: {item.pressaoX / 10}/{item.pressaoY / 10}</Text>
                          </View>
                          <View style={{ height: 25, paddingStart: 6, paddingEnd: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: fontColor }}>Estado: {this.getEstadoByCodigo(item.estado)}</Text>
                            <Image source={this.getImageByCodigo(item.estado)} style={{ height: 25, width: 79 }} />
                          </View>
                        </View>
                      }
                    />

                  </View>
                  <View style={{ height: 92, justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                      }}
                      style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>ADICIONAR +</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </Tab>
              <Tab heading="Exames"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>

                <View style={styles.containerTabsNoPadding}>
                  <ScrollView>
                    <View flex={1}>
                      <TouchableOpacity 
                        onPress={() => {
                          this.setState({
                            showTrimestre1: !this.state.showTrimestre1,
                            rotationT1: this.state.rotationT1==='180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60,borderBottomWidth: 1, borderColor: fontColor,  paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', elevation: 2, shadowOffset: 15, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>1º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT1 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      { this.state.showTrimestre1 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(1)}
                        </View>
                      ) : (
                        <View />
                      ) }

                      <TouchableOpacity 
                        onPress={() => {
                          this.setState({
                            showTrimestre2: !this.state.showTrimestre2,
                            rotationT2: this.state.rotationT2==='180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60,borderBottomWidth: 1, borderColor: fontColor,  paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', elevation: 2, shadowOffset: 15, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>2º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT2 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      { this.state.showTrimestre2 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(2)}
                        </View>
                      ) : (
                        <View />
                      ) }

                      <TouchableOpacity 
                        onPress={() => {
                          this.setState({
                            showTrimestre3: !this.state.showTrimestre3,
                            rotationT3: this.state.rotationT3==='180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60,borderBottomWidth: 1, borderColor: fontColor,  paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', elevation: 2, shadowOffset: 15, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>3º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT3 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      { this.state.showTrimestre3 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(3)}
                        </View>
                      ) : (
                        <View />
                      ) }

                    </View>
                  </ScrollView>
                  <View style={{ height: 92, marginStart: 16, marginEnd: 16, justifyContent: 'center' }}>
                        <TouchableOpacity
                          onPress={() => {
                          }}
                          style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>NOVO EXAME</Text>
                        </TouchableOpacity>

                      </View>

                </View>
              </Tab>
              <Tab heading="Ajuda"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>

                <View style={styles.containerTabs}>
                  <ScrollView>
                    <View style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Consultas Pré-natal</Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Rede de atendimento de alto risco a gestante no Piauí</Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <Text style={styles.textButton}>UBSses mais próximas de você</Text>
                    </View>
                    <View style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Consultas Pré-natal</Text>
                    </View>
                  </ScrollView>
                </View>
              </Tab>
            </Tabs>
          </Container>
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
  containerTabs: {
    flex: 1,
    paddingTop: 16,
    paddingStart: 16,
    paddingEnd: 16,
    backgroundColor: colorFundo
  },
  containerTabsNoPadding: {
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
    borderRadius: 15
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
  buttonStyle: {
    minHeight: 60,
    backgroundColor: white,
    elevation: 2,
    shadowOpacity: 10,
    marginBottom: 16,
    padding: 16,
    justifyContent: 'center',
    borderRadius: 15
  },
  titleTab1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: fontColor
  },
  textButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: fontColor
  }
});
