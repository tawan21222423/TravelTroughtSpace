import React, { Component, useRef, useState, useEffect } from 'react';
import { Pages } from 'react-native-pages';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity ,Modal} from 'react-native';
//https://docs.expo.io/versions/latest/sdk/linear-gradient/
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';
import LottieView from 'lottie-react-native';
import { changeShip,changePic } from "../store/actions/storetemp"
import { datasystem,profilePic } from "../dataSystem/data"
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
const data = [{
  picture: require('../assets/spaceship/ship1.png')
}, {
  picture: require('../assets/spaceship/ship2.png')
}, {
  picture: require('../assets/spaceship/ship3.png')
}]

const Profile = (props) => {
  const currentShip = useSelector((state) => state.user.CurrentShip);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalchange ,setmodalchange] = useState(false);
  const [dataach, setdataach] = useState(currentShip)
  const [indexmain, setindexmain] = useState(currentShip)
  const [alertcantchange, setalertcantchange] = useState(false)
  const [alertcantchangecan, setalertcantchangecan] = useState(false)
  const [p, setp] = useState(0)
  const carouselRef = useRef('')
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [datas,setdatas] = useState()
  const [load, setLoad] = useState(false)
  const [progressArch, setProgressArch] = useState(0.0)
  const [fcount, setfCount] = useState(0)


  const bg = useSelector( (state) => state.img.background );
  

  
  useEffect(() => {
    var count = 0
    for (var key in user['gotAchievement']) {
      if (user['gotAchievement'].hasOwnProperty(key)) {
        if (user['gotAchievement'][key]) {
          count += 1
        }
      }
    }
    //setProgressArch(count)
    
    //console.log(count + ' Count')
    //console.log(parseFloat(Object.keys(user['gotAchievement']).length) + " all")
    const progress = parseFloat(count) / parseFloat(Object.keys(user['gotAchievement']).length)
    setfCount(fcount)
    setProgressArch(progress)
    //console.log("setProgressArch " +progressArch)
  }, [])
  
  /*
  const achive = {}
    const ref = firebase.database().ref('Achievement')
    ref.on("child_added", function(Data){
      achive[Data.key] = Data.val()
      })*/
  const achive = useSelector( (state) => state.achive);
  //console.log(achive)


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.box}>
        <Image
          style={styles.spaceShip}
          source={item.picture} //???????????? data ?????????
        />
      </View>);
  };


  const changepic = (index) => {
    dispatch(changePic(index))
    setp(p+1);
  }

  const changeship = () => {
    //console.log(user['gotAchievement'].length)
    console.log(indexmain + 'ssssssssssssssssssss')
    if (indexmain == 2) {
      if (user['shipList'][2]) {
        dispatch(changeShip(indexmain))
        setalertcantchangecan(true)
      } else
        setalertcantchange(true)
    }
    else if (indexmain == 1) {
      if (user['shipList'][1]) {
        dispatch(changeShip(indexmain))
        setalertcantchangecan(true)
      } else
        setalertcantchange(true)
    }
    else {
      dispatch(changeShip(indexmain))
      setalertcantchangecan(true)
    }
  }
  const renderCustomAlertViewregis = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <LottieView
          autoPlay={true}
          speed={2}
          loop={false}
          style={{
            width: Dimensions.get('window').width * 0.2,

          }}
          source={require('../assets/failure.json')}
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.Textalert}>Can't Change ship</Text>
          <Text style={styles.Textalertmini}>You need to do more quiz boiz</Text>
        </View>
        <TouchableOpacity style={styles.failedlbutton}
          onPress={() => {
            setalertcantchange(false)
          }}>
          <Text style={styles.Textinbutton}>
            Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const renderCustomAlertView = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <LottieView
          autoPlay={true}
          speed={2}
          loop={false}
          style={{
            width: Dimensions.get('window').width * 0.2,

          }}
          source={require('../assets/success.json')}
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.Textalert}>Change ship Success</Text>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            setalertcantchangecan(false)
          }}>
          <Text style={styles.Textinbutton}>
            Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <ImageBackground source={{uri : bg}} style={styles.container} resizeMode="repeat">
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backbutton}>
          <Ionicons name="ios-arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("loginScreen")}
          style={styles.logoutbutton}>
          <Text style={{color: 'white'}}>Log out</Text>
        </TouchableOpacity>
        <Animatable.View style={styles.Bgprofile} animation="fadeInDown" delay={0}>
          <TouchableOpacity onPress={() => {setmodalchange(true)}}>
          <Image
            style={styles.profilePic}
            source={profilePic[user.Profile]['pic']} //???????????????????????? UserDB
          /></TouchableOpacity>
          <Text style={styles.textTitle}>{user.fname}</Text>
        </Animatable.View>
        <View style={styles.detail}>
          <Animatable.View style={styles.box} animation="fadeInUp" delay={200}>
            <View style={styles.DetailBox}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Name: {user.fname} {user.lname}</Text>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold',marginTop: 10, }}>Email: {user.email}</Text>
            </View>
          </Animatable.View>

          <Animatable.View style={styles.ship} animation="fadeInUp" delay={300}>

            <View style={styles.topship}>
              <Text style={styles.titleship}>Your Ship</Text>
              <TouchableOpacity style={styles.Select}
                onPress={() => {
                  changeship()
                }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(0,142,255)' }}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.bottomship}>

                <Carousel
                  ref={carouselRef}
                  data={data}
                  style={styles.Carousel}
                  renderItem={renderItem}
                  sliderWidth={Dimensions.get('window').width * 0.9}
                  itemWidth={Dimensions.get('window').width * 0.30}
                  activeSlideAlignment={'center'}
                  loop={true}
                  firstItem={currentShip}
                  loopClonesPerSide={5}
                  useScrollView={true}
                  inactiveSlideScale={0.5}
                  onSnapToItem={(index) => { setindexmain(index)}}
                />
              </View>

            </View>
          </Animatable.View>
          <Animatable.View style={styles.box} animation="fadeInUp" delay={400}>
            <View style={styles.DetailBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleship}>Achievement</Text>
                <TouchableOpacity style={styles.Select}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgb(0,142,255)' }}>View</Text>
                </TouchableOpacity></View>

              <Text style={{
                fontSize: 15, color: 'white', fontWeight: 'bold'
                , marginTop: Dimensions.get('window').height * 0.01
                , marginBottom: Dimensions.get('window').height * 0.015
              }}>Progess : {progressArch  *100}%</Text>
              <ProgressBar
                progress={progressArch}
                width={Dimensions.get('window').width * 0.8}
                height={20}
                animated={true}
                color={"lime"} //?????????????????????
                borderWidth={2}
                borderColor={"white"}
              />
            </View>
          </Animatable.View>
        </View>
        <AwesomeAlert
          show={alertcantchange}
          showProgress={false}
          customView={renderCustomAlertViewregis()}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          contentContainerStyle={styles.alert}
          overlayStyle={styles.bgalert}
        />
        <AwesomeAlert
          show={alertcantchangecan}
          showProgress={false}
          customView={renderCustomAlertView()}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          contentContainerStyle={styles.alert}
          overlayStyle={styles.bgalert}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Achievement</Text>
              <View style={styles.closebuttonView}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                ><FontAwesome name="close" size={30} color="white" />
                </TouchableOpacity></View>
                <ScrollView style={{ flexDirection: 'column',}}>
                {datasystem.map((item,index)=>{

                  return(
                    <View key={index} style={[styles.boxach ,user['gotAchievement'][item.title] ? {backgroundColor: '#2aaf74'}: {backgroundColor: '#ffffff22'}]}>
                      <Image
                        style={{width: 100,height:100}}
                        source={item.picture} //???????????????????????? UserDB
                    />
                    <View style={{justifyContent: 'center',marginLeft: 20,}}>
                    <Text style={{fontWeight: 'bold',width: Dimensions.get('window').width*0.30,color:'white'}}>{achive[item.title]['name']}</Text>
                    </View>
                    </View>
                  )
                })}</ScrollView>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalchange}>
          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <Text style={{color: 'white', fontSize: 26,margin:10,fontWeight: 'bold'}}>Pick what you like!!</Text>
              <View style={styles.closebuttonView}>
                <TouchableOpacity
                  onPress={() => {
                    setmodalchange(!modalchange);
                  }}
                ><FontAwesome name="close" size={30} color="white" />
                </TouchableOpacity></View>
                <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                {profilePic.map((item,index)=>{

                  return(
                    <View key={index} style={{margin: 10}}>
                      <TouchableOpacity 
                        onPress={() => {changepic(index)}}>
                      <Image
                        style={{width: Dimensions.get('window').width*0.23,height:Dimensions.get('window').height*0.12,borderRadius: 10,}}
                        source={item.pic}
                    />
                    <Text style={{display: 'none'}}>{p}</Text>
                    </TouchableOpacity>
              
                    </View>
                  )
                })}</View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>

  );
}
export default Profile;
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  titleship: {
    fontSize: 24,
    marginRight: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  textTitle: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold'
  },
  Spaceship: {
    height: 100,
    width: 100,
  },
  linearGradient: {
    height: windowHeight,
  },
  Textcenter: {
    fontSize: 48,
    color: 'black',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  Bgprofile: {
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.40,
    shadowRadius: 10.19,
    elevation: 20,
    marginTop: windowHeight * 0.06,
    marginBottom: windowHeight * 0.04,
  },
  profilePic: {
    width: 180,
    height: 180,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 90,
    margin: 10,
    marginBottom: windowHeight * 0.04,
  },
  detail: {
    height: '70%',
    alignItems: 'center',
  },
  DetailBox: {
    backgroundColor: '#1f4068',
    width: windowWidth * 0.9,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: "center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  ship: {
    borderRadius: 15,
    width: windowWidth * 0.9,
    marginTop: 30,
    backgroundColor: '#1f4068',
    paddingBottom: 10,

  },
  topship: {
    height: 40,
    width: windowWidth * 0.45,
    borderRadius: 15,
    marginTop: 15,
    marginLeft: windowWidth * 0.05,
    flexDirection: 'row',
  },
  bottomship: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceShip: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,


  },
  Select: {
    height: 30,
    backgroundColor: "#0f3057",
    borderColor: 'rgb(0,142,255)',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  linear: {
    width: windowWidth,
    height: windowHeight * 0.45,
    borderRadius: 10,
  },
  backbutton: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: windowHeight * 0.08,
    left: windowWidth * 0.08,
    zIndex: 1,
  }, bgalert: {
    backgroundColor: '#000000bb'
  },
  failedlbutton: {
    marginTop: 20,
    backgroundColor: 'rgb(255,69,58)',
    width: Dimensions.get('window').width * 0.6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'rgb(48,209,88)',
    width: Dimensions.get('window').width * 0.6,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  alert: {
    backgroundColor: '#1f4068',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.7,
  },
  Textalert: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  Textalertmini: {
    marginTop: 20,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  modalView: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.8,
    margin: 20,
    backgroundColor: "#1f4068",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
modalView2: {
  width: Dimensions.get('window').width * 0.9,
  height: Dimensions.get('window').height * 0.25,
  margin: 20,
  backgroundColor: "#2aaf74",
  borderRadius: 20,
  padding: 20,

  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
},
textStyle: {
    color: "white",
    fontWeight: "bold",

},
modalText: {
  margin: 15,
    marginBottom: 15,
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold'
},
closebuttonView: {
    padding: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    
    position: 'absolute',
    right: Dimensions.get('window').width * 0.05,
    top: Dimensions.get('window').height * 0.02,
},
centeredView: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: "center",
  marginTop: 22
},
boxach:{
  margin: 10,
  marginHorizontal: 17,
  padding: 7,
  borderRadius: 7,
  flexDirection: 'row',
  borderWidth: 3,
  borderColor: 'white'
},
logoutbutton:{
    height: 40,
    padding: 5,
    paddingHorizontal: 7,
    position: 'absolute',
    top: windowHeight * 0.082,
    right: windowWidth * 0.04,
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: '#1f4068',
    borderRadius: 5,
    borderWidth:5,
    borderColor: '#ff414d'
}
});