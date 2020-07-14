import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native'
import { 
  colorPrimaryDark, 
  colorPrimary, 
  colorFundo, 
  black, 
  blackSemiTransparent, 
  white, 
  fontColor, 
  red 
} from '../../../colors';
import { 
  ICONDOWN, 
  ICONCHECKED, 
  ICONHEARTSAUDAVEL, 
  ICONHEARTRISCO, 
  ICONCLOSE, 
  ICONGIRL,
  ICONEDIT
} from '../../../images'
import {
  nomeCompletoLabel,
  nomeCompletoPlaceholder
} from '../../../strings';
import { 
  Container, 
  Tab, 
  Tabs 
} from 'native-base'
import { 
  maskForDate, 
  countDays, 
  getSintomas 
} from '../../global_components/GlobalFunctions';
import { 
  findAllNotRemoved, 
  updateThis, 
  getNextMid, 
  saveThis, 
  findFirstByFilter 
} from '../../../realm_services/RealmService';

export default class UserMainPage extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return ({
        headerTitle: 'Olá, mamãe!',
        headerRight: (
            <TouchableOpacity onPress={() => {
              navigation.navigate('RegisterFirstStep', {is_edit: 1})
            }}>
                <View>
                  <Image source={ICONEDIT} style={{height: 24, width: 24, marginEnd: 16}} />
                </View>
            </TouchableOpacity>
        )
    })
}


  constructor(props) {
    super(props)
    const { navigation } = this.props

    let exames = []
    let examesBD = findAllNotRemoved('Exame')
    let consultas = findAllNotRemoved('Consulta')
    let gravidez = findFirstByFilter('Gravidez', 'removido = false')

    examesBD.map((it) => {
      exames.push({
        mid: it.mid,
        trimestre: it.trimestre,
        nome: it.nome,
        feito: it.feito
      })
    })

    this.state = {
      nameExame: "",
      consultas: consultas,
      exames: exames,
      showTrimestre1: false,
      rotationT1: '0deg',
      showTrimestre2: false,
      rotationT2: '0deg',
      showTrimestre3: false,
      rotationT3: '0deg',
      showModalExame: false,
      trimestreSelecionado: 1,
      gravidez: gravidez
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

        let object = {}
        object.mid = it.mid
        object.feito = it.feito

        updateThis('Exame', object, ['feito'])
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
            style={{ minHeight: 60, marginBottom: 16, padding: 16, borderRadius: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: fontColor, backgroundColor: white }}>
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

  refreshConsultas = () => {
    let consultas = findAllNotRemoved('Consulta')
    this.setState({
      consultas: consultas
    })
  }

  saveExame = () => {
    let exames = this.state.exames
    let newExames = []

    let exame = {}
    exame.mid = getNextMid('Exame')
    exame.nome = this.state.nameExame
    exame.trimestre = this.state.trimestreSelecionado
    exame.feito = false
    exame.createdAt = new Date()
    exame.removido = false
    saveThis('Exame', exame)

    exames.map((it) => {
      newExames.push(it)
    })

    newExames.push({
      mid: exame.mid,
      trimestre: exame.trimestre,
      nome: exame.nome,
      feito: exame.feito
    })

    this.setState({
      showModalExame: false,
      exames: newExames
    })
  }

  getSemanaGravidez(date) {
    let value = countDays(this.state.gravidez.createdAt, date) / 7
    if (value < 1) {
      return this.state.gravidez.semana
    } else {
      value += this.state.gravidez.semana
      return parseInt(Math.round(value), 10)
    }
  }

  render() {
    let modal = <Modal
      animationType="slide"
      visible={this.state.showModalExame}
      transparent>
      <View style={styles.containerModal}>
        <View style={styles.viewContentModal}>
          <View style={{
            flex: 4,
            margin: 10
          }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: fontColor }}>Novo exame</Text>
              <TouchableOpacity onPress={() => {
                this.setState({
                  showModalExame: false
                })
              }}>
                <Image source={ICONCLOSE} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 6, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: fontColor }}>Selecione o trimestre</Text>
              <View style={{ height: 50, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      trimestreSelecionado: 1
                    })
                  }}
                  style={[
                    this.state.trimestreSelecionado == 1 ? (
                      styles.buttonTrimestreSelecionado
                    ) : (
                        styles.buttonTrimestre
                      ),
                    { marginEnd: 6 }]
                  }>
                  <Text style={this.state.trimestreSelecionado == 1 ?
                    (
                      styles.textTrimestreSelecionado
                    ) : (
                      styles.textTrimestre
                    )
                  }>1º</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      trimestreSelecionado: 2
                    })
                  }}
                  style={[
                    this.state.trimestreSelecionado == 2 ? (
                      styles.buttonTrimestreSelecionado
                    ) : (
                        styles.buttonTrimestre
                      ),
                    { marginEnd: 6 }]
                  }>

                  <Text style={this.state.trimestreSelecionado == 2 ?
                    (
                      styles.textTrimestreSelecionado
                    ) : (
                      styles.textTrimestre
                    )
                  }>2º</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      trimestreSelecionado: 3
                    })
                  }}
                  style={[
                    this.state.trimestreSelecionado == 3 ? (
                      styles.buttonTrimestreSelecionado
                    ) : (
                        styles.buttonTrimestre
                      ),
                    { marginStart: 6 }]
                  }>
                  <Text style={this.state.trimestreSelecionado == 3 ?
                    (
                      styles.textTrimestreSelecionado
                    ) : (
                      styles.textTrimestre
                    )
                  }>3º</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 6, minHeight: 50, justifyContent: 'center' }}>
              <Text style={styles.textOverField}>{nomeCompletoLabel}</Text>
              <View style={styles.containerTextInput}>
                <TextInput
                  textColor={black}
                  tintColor={black}
                  baseColor={black}
                  value={this.state.nameExame}
                  style={styles.text}
                  placeholder={nomeCompletoPlaceholder}
                  onChangeText={(nameExame) => this.setState({ nameExame })}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewForButton}>
            <TouchableOpacity
              onPress={() => {
                this.saveExame()
              }}
              style={styles.styleButton}>
              <Text style={styles.textForButton}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    return (
      <View style={styles.safeView}>
        {modal}
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />

        <View style={styles.container}>
          <View style={{ minHeight: 30, paddingStart: 16, backgroundColor: colorPrimary }}>
            <Text style={{ color: white, fontSize: 12, fontWeight: 'bold' }}>Você está na {this.getSemanaGravidez(new Date())}ª semana da sua gravidez</Text>
          </View>
          <Container>
            <Tabs
              initialPage={0}
              scrollWithoutAnimation={true} >
              <Tab heading="Evolução"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>

                <View style={styles.containerTabs}>
                  <Text style={styles.titlePage}>Registre aqui a evolução da sua gravidez</Text>
                  <View style={{ flex: 1, marginTop: 16 }}>

                    <FlatList
                      extraData={this.state}
                      data={this.state.consultas}
                      snapToAlignment={"center"}
                      flex={1}
                      renderItem={({ item }) =>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('RegistroConsulta', {
                              onGoBack: this.refreshConsultas,
                              midConsulta: item.mid,
                              numeroConsultas: this.state.consultas.length
                            })
                          }}
                          style={{ minHeight: 100, backgroundColor: white, borderWidth: 1, borderColor: fontColor, borderRadius: 15, marginBottom: 16, paddingTop: 10, paddingBottom: 10, paddingStart: 6, paddingEnd: 6, justifyContent: 'center', marginRight: 6 }}>
                          <View style={{ height: 25, paddingStart: 6, flexDirection: 'row' }}>
                            <Text style={{ color: fontColor }}>{maskForDate(item.data)}</Text>
                            <Text style={{ color: fontColor }}> - {this.getSemanaGravidez(item.data)}ª semana</Text>
                          </View>
                          <View style={{ minHeight: 50, paddingStart: 6, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, color: fontColor }}>Peso: {item.peso}kg, Pressão: {item.pressao_x}/{item.pressao_y}</Text>
                          </View>
                          <View style={{ height: 25, paddingStart: 6, paddingEnd: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: fontColor }}>Estado: {this.getEstadoByCodigo(item.estado)}</Text>
                            <Image source={this.getImageByCodigo(item.estado)} style={{ height: 25, width: 79 }} />
                          </View>
                        </TouchableOpacity>
                      }
                    />

                  </View>
                  <View style={{ height: 92, justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('RegistroConsulta', {
                          onGoBack: this.refreshConsultas,
                          numeroConsultas: this.state.consultas.length
                        })
                      }}
                      style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>NOVA CONSULTA</Text>
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
                            rotationT1: this.state.rotationT1 === '180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60, paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: blackSemiTransparent, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>1º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT1 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      {this.state.showTrimestre1 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(1)}
                        </View>
                      ) : (
                          <View />
                        )}

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            showTrimestre2: !this.state.showTrimestre2,
                            rotationT2: this.state.rotationT2 === '180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60, paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: blackSemiTransparent, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>2º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT2 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      {this.state.showTrimestre2 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(2)}
                        </View>
                      ) : (
                          <View />
                        )}

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            showTrimestre3: !this.state.showTrimestre3,
                            rotationT3: this.state.rotationT3 === '180deg' ? '0deg' : '180deg'
                          })
                        }}
                        style={{ height: 60, paddingStart: 16, paddingEnd: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: blackSemiTransparent, backgroundColor: white }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: fontColor }}>3º trimestre</Text>
                        <Image source={ICONDOWN} style={{ transform: [{ rotate: this.state.rotationT3 }], height: 24, width: 24 }} />
                      </TouchableOpacity>

                      {this.state.showTrimestre3 ? (
                        <View style={{ paddingStart: 16, paddingEnd: 16, paddingTop: 16, flexDirection: 'column' }}>
                          {this.getTableByTrimestre(3)}
                        </View>
                      ) : (
                          <View />
                        )}

                    </View>
                  </ScrollView>
                  <View style={{ height: 92, marginStart: 16, marginEnd: 16, justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          showModalExame: true
                        })
                      }}
                      style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 25, backgroundColor: colorPrimary }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: white }}>NOVO EXAME</Text>
                    </TouchableOpacity>

                  </View>

                </View>
              </Tab>
              <Tab heading="Sintomas"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>
                <View style={styles.containerTabs}>
                  <ScrollView>
                    <Text style={styles.titlePage}>Sinais e sintomas de alerta</Text>
                    <Text style={styles.subtitlePage}>
                      Ao apresentar algum desses sintomas, entre em contato com os profissionais da sua Unidade de Saúde da Família, a Maternidade mais próxima ou um serviço de Emergência
                      </Text>
                    {getSintomas(1).map((item) => {
                      return (<View style={styles.cardData}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.subitemTitle}>{item.content}</Text>
                      </View>)
                    })}
                    <View style={{ height: 16 }} />
                    <Text style={styles.titlePage}>ATENÇÃO:</Text>
                    {getSintomas(2).map((item) => {
                      return (<View style={styles.cardData}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text>
                          <Text style={styles.subitemTitle}>{item.content}</Text>
                          <Text style={[styles.subitemTitle, { fontWeight: 'bold', color: red }]}>{item.valueOnly}</Text>
                          <Text style={styles.subitemTitle}>{item.content2}</Text>
                        </Text>
                      </View>)
                    })}

                  </ScrollView>
                </View>
              </Tab>

              <Tab heading="Ajuda"
                activeTextStyle={{ color: white }}
                activeTabStyle={{ backgroundColor: colorPrimaryDark }}
                textStyle={{ color: white }}
                tabStyle={{ backgroundColor: colorPrimary }}>

                <View style={styles.containerTabs}>
                  <ScrollView>
                    {/*<TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ConsultationSchedules')
                      }}
                     style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Consultas Pré-natal</Text>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ConsultationSchedules')
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Consultas Agendadas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('FluxoAtendimento')
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Fluxo de atendimento</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('RedeAtendimentoPage')
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Rede de atendimento de alto risco a gestante no Piauí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('UBSesProximasPage')
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Hospitais mais próximos de você</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Contatos')
                      }}
                      style={styles.buttonStyle}>
                      <Text style={styles.textButton}>Contatos para ajuda</Text>
                    </TouchableOpacity>
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
  containerModal: {
    flex: 1,
    backgroundColor: blackSemiTransparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewForButton: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContentModal: {
    minHeight: 300,
    width: '75%',
    backgroundColor: colorFundo,
    borderRadius: 25,
    padding: 16
  },
  textOverField: {
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
    borderWidth: 1,
    borderColor: fontColor,
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
  },
  styleButton: {
    backgroundColor: colorPrimary,
    height: '100%',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textForButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white
  },
  buttonTrimestre: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: white,
    elevation: 2,
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTrimestreSelecionado: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colorPrimaryDark,
    elevation: 2,
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTrimestre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: fontColor
  },
  textTrimestreSelecionado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: white
  },
  titlePage: {
    fontSize: 24,
    color: fontColor,
    fontWeight: 'bold'
  },
  chapterTitle: {
    fontSize: 20,
    color: fontColor,
    fontWeight: 'bold',
    marginTop: 16
  },
  itemTitle: {
    fontSize: 18,
    color: fontColor,
    fontWeight: 'bold',
    marginTop: 16
  },
  subitemTitle: {
    fontSize: 16,
    color: fontColor,
    marginStart: 6,
    textAlign: 'justify'
  },
  subtitlePage: {
    fontSize: 18,
    color: fontColor,
    textAlign: 'justify'
  },
  cardData: {
    minHeight: 50,
    borderBottomWidth: 0.5,
    borderColor: blackSemiTransparent,
    alignItems: 'flex-start',
    padding: 16
  }
});
