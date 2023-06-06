import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";
import Axios from 'axios'; //추가

const Products = [
    {
      id: "1232",
      name:"독서대",
      price: 1000,
      src:"https://cdn-std-web-146-149.cdn-nhncommerce.com/eastnine_godomall_com/data/goods/17/05/22/1000000136/1000000136_detail_055.jpg",
    },
    {
      id: "1233",
      name:"블라인드",
      price: 10000,
      src:"https://www.costco.co.kr/medias/sys_master/images/haa/h4a/79174940885022.webp",
    },
    {
      id: "1234",
      name:"주전자",
      price: 1000,
      src:"https://shopping-phinf.pstatic.net/main_6229849/6229849107.12.jpg?type=f300",
    },
    {
      id: "1235",
      name: "멀티탭",
      price: 2000,
      src:"http://www.promademall.co.kr/shop/data/goods/1648095471371l0.jpg",
    },
    {
      id: "1236",
      name: "후라이팬",
      price: 3000,
      src:"https://simage.mujikorea.net/goods/31/13/93/19/4550182577082_N_N_400.jpg",
    },
    {
      id: "1237",
      name: "전자시계",
      price: 4000,
      src:"https://simage.mujikorea.net/goods/31/04/60/43/4547315831999_N_N_400.jpg",
    },
  ];

  var month=new Date().getMonth()+1;
  var todayDate=new Date().getDate();
  const week=['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek=week[new Date().getDay()+3];

const Cart_infoContainer = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId, category } = route.params;

  const getProductName = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.name : '상세 정보 없음';
  };

  const getProductPrice = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.price : '상세 정보 없음';
  };

  const getProductImg = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.src : '상세 정보 없음';
  };

  return (
      <ScrollView contentContainerStyle={pa_styles.container}
      pagingEnabled={true}
      vertical={true}>

         <View style={pa_styles.photo}>
           <Image source={{uri: getProductImg(productId)}} style={{width:"95%",height:"100%",borderRadius:100}}/>
         </View>
         <View style={pa_styles.info}>
          <View style={in_styles.button}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{getProductName(productId)}</Text>
            </View>
          </View>
          <View style={in_styles.button_p}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{getProductPrice(productId)} 원</Text>
            </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>{dayOfWeek}요일 {month}/{todayDate+3} 전 도착 예정</Text>
             </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>당일출고 (평일 오후 2시 전 주문 시)</Text>
             </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>무료배송</Text>
             </View>
          </View>
         </View>
      </ScrollView>
    );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 16,
     backgroundColor: '#fff',
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 16,
   },
   detail: {
     fontSize: 16,
   },
 });

 const pa_styles=StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: '#ffffff',
   },
   photo:{
     width:"100%",
     height:"50%",
     backgroundColor: '#ffffff',
     alignItems: 'center',
   },
   info:{
     width:"100%",
     height:"70%",
     backgroundColor: '#ffffff',
     flexDirection: 'column',
     alignItems: 'center',
   },
 });

 const in_styles=StyleSheet.create({
   button: {
     width:"100%",
     height:"15%",
     flexDirection: 'row',
     alignItems: "center",
     backgroundColor: "#ffffff",
     marginLeft: 40,
     marginTop: 10,
   },
   button_p: {
     width:"100%",
     height:"8%",
     flexDirection: 'row',
     alignItems: "center",
     backgroundColor: "#ffffff",
     marginLeft: 40,
   },
   block_l:{
     flex:1,
     backgroundColor: '#ffffff',
   },
   block_m:{
     backgroundColor: '#ffffff',
   },
   block_r:{
     backgroundColor: '#ffffff',
   },
   text_l:{
     fontSize: 25,
     color: '#000000',
     alignItems: 'center',
     fontWeight: "bold",
   },
   text_m:{
     fontSize: 19,
     color: '#A6A6A6',
   },
   text_r:{
     fontSize: 20,
     color: '#A6A6A6',
     fontWeight: "bold",
   },
   text_g:{
     fontSize: 20,
     color: '#000000',
     alignItems: 'center',
   },
 });

export default Cart_infoContainer;

/*
import React , { useEffect, useState } from 'react';
import { View, Text,  Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs();

LocaleConfig.locales['ko'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
LocaleConfig.defaultLocale = 'ko';

let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;

export default function ReportContainer({navigation}){
    
    const[ouID, setOuID]=useState('');//회원번호 찾기
    const[opetList, setOpetList]=useState([]);//해당 회원의 반려동물번호 리스트 찾기
    const[opetN, setOpetN]=useState([]);//반려동물번호에 해당하는 반려동물 이름찾기
    const[opetURL, setOpetURL]=useState([]);

    const[outNumBoolaBef, setOutNumBoolaBef]=useState([]);
    const[outNumBoolaAft, setOutNumBoolaAft]=useState([]);
    const[outTimeBoolaBef, setOutTimeBoolaBef]=useState([]);
    const[outTimeBoolaAft, setOutTimeBoolaAft]=useState([]);
    const[outNumBoolbBef, setOutNumBoolbBef]=useState([]);
    const[outNumBoolbAft, setOutNumBoolbAft]=useState([]);
    const[outTimeBoolbBef, setOutTimeBoolbBef]=useState([]);
    const[outTimeBoolbAft, setOutTimeBoolbAft]=useState([]);

    const[outNumBoola, setOutNumBoola]=useState("");
    const[outTimeBoola, setOutTimeBoola]=useState("");
    const[outTimeBoolaStr, setOutTimeBoolaStr]=useState("");
    const[outLevelBoolaOne, setOutLevelBoolaOne]=useState([]);
    const[outLevelBoolaTwo, setOutLevelBoolaTwo]=useState([]);
    const[outNumBoolb, setOutNumBoolb]=useState("");
    const[outTimeBoolb, setOutTimeBoolb]=useState("");
    const[outTimeBoolbStr, setOutTimeBoolbStr]=useState("");
    const[outLevelBoolbOne, setOutLevelBoolbOne]=useState([]);
    const[outLevelBoolbTwo, setOutLevelBoolbTwo]=useState([]);

    var month=new Date().getMonth();
    var year=new Date().getFullYear();
    const daysNum=new Date(year, month-1, 0);//전달 일수
    const calStart=new Date(year, month-1, 1);//전달 1일부터
    const calEnd=new Date(year, month-1, 31);//전달 말일까지

    const petidwaiting = async() => {
      firestore()
        .collection("users")
        .where("email", "==", "hong12@konkuk.ac.kr")//로그인된 사용자 이메일
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
          setOuID(documentSnapshot.id);
        });
      });
      firestore()
        .collection('petlist')
        .where('userID', '==', ouID)//사용자 반려동물 목록
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
          setOpetList(opetList => [...opetList, documentSnapshot.data().petID]);
        });
      });
      firestore()
        .collection('pets')
        .where('petID', 'in', opetList)//사용자 반려동물 이름목록
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
          setOpetN(opetN => [...opetN, documentSnapshot.data().name]);
          setOpetURL(opetURL => [...opetURL, documentSnapshot.data().photo]);
        });
      });
    };

    useEffect(() => {
      petidwaiting();
    });

    const petUserMatching = async() => {
      const opetListset=Array.from(new Set(opetList));
      
      if(opetListset.length<3) {
        const opetListset=Array.from(new Set(opetList));
        firestore()
          .collection("workoutlist")
          .where("petID", "in", opetListset)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
            if(documentSnapshot.data().petID==opetListset[0]&&documentSnapshot.data().day.toDate().getMonth()==(month-2)) {//0번펫 전전달 산책날짜
              setOutNumBoolaBef(outNumBoolaBef => [...outNumBoolaBef, documentSnapshot.data().day.toDate().getFullYear()+"-"+(documentSnapshot.data().day.toDate().getMonth()+1)+"-"+documentSnapshot.data().day.toDate().getDate()]);
              setOutTimeBoolaBef(outTimeBoolaBef => [...outTimeBoolaBef, documentSnapshot.data().time]);
            }
            else if(documentSnapshot.data().petID==opetListset[0]&&documentSnapshot.data().day.toDate().getMonth()==(month-1)) {//0번펫 전달 산책날짜
              setOutNumBoolaAft(outNumBoolaAft => [...outNumBoolaAft, documentSnapshot.data().day.toDate().getFullYear()+"-"+(documentSnapshot.data().day.toDate().getMonth()+1)+"-"+documentSnapshot.data().day.toDate().getDate()]);
              setOutTimeBoolaAft(outTimeBoolaAft => [...outTimeBoolaAft, documentSnapshot.data().time]);
              if(documentSnapshot.data().level==1) {
                setOutLevelBoolaOne(outLevelBoolaOne => [...outLevelBoolaOne, documentSnapshot.data().day.toDate().getFullYear()+"-"+String(documentSnapshot.data().day.toDate().getMonth()+1).padStart(2,'0')+"-"+String(documentSnapshot.data().day.toDate().getDate()).padStart(2,'0')]);
              }
              else if(documentSnapshot.data().level==2) {
                setOutLevelBoolaTwo(outLevelBoolaTwo => [...outLevelBoolaTwo, documentSnapshot.data().day.toDate().getFullYear()+"-"+String(documentSnapshot.data().day.toDate().getMonth()+1).padStart(2,'0')+"-"+String(documentSnapshot.data().day.toDate().getDate()).padStart(2,'0')]);
              }
            }
            else if(documentSnapshot.data().petID==opetListset[1]&&documentSnapshot.data().day.toDate().getMonth()==(month-2)) {//1번펫 전전달 산책날짜
              setOutNumBoolbBef(outNumBoolbBef => [...outNumBoolbBef, documentSnapshot.data().day.toDate().getFullYear()+"-"+(documentSnapshot.data().day.toDate().getMonth()+1)+"-"+documentSnapshot.data().day.toDate().getDate()]);
              setOutTimeBoolbBef(outTimeBoolbBef => [...outTimeBoolbBef, documentSnapshot.data().time]);
            }
            else if(documentSnapshot.data().petID==opetListset[1]&&documentSnapshot.data().day.toDate().getMonth()==(month-1)) {//1번펫 전달 산책날짜
              setOutNumBoolbAft(outNumBoolbAft => [...outNumBoolbAft, documentSnapshot.data().day.toDate().getFullYear()+"-"+(documentSnapshot.data().day.toDate().getMonth()+1)+"-"+documentSnapshot.data().day.toDate().getDate()]);
              setOutTimeBoolbAft(outTimeBoolbAft => [...outTimeBoolbAft, documentSnapshot.data().time]);
              if(documentSnapshot.data().level==1) {
                setOutLevelBoolbOne(outLevelBoolbOne => [...outLevelBoolbOne, documentSnapshot.data().day.toDate().getFullYear()+"-"+String(documentSnapshot.data().day.toDate().getMonth()+1).padStart(2,'0')+"-"+String(documentSnapshot.data().day.toDate().getDate()).padStart(2,'0')]);
              }
              else if(documentSnapshot.data().level==2) {
                setOutLevelBoolbTwo(outLevelBoolbTwo => [...outLevelBoolbTwo, documentSnapshot.data().day.toDate().getFullYear()+"-"+String(documentSnapshot.data().day.toDate().getMonth()+1).padStart(2,'0')+"-"+String(documentSnapshot.data().day.toDate().getDate()).padStart(2,'0')]);
              }
            }
          });
        });

      }  
    };

    useEffect(() => {
      if(opetN[0]!=opetN[1]&&opetN.length!=0) {
        petUserMatching();
      }
    }, [opetN]);

    const numBool = async() => {
      if((outNumBoolaAft.length>=outNumBoolaBef.length)&&outNumBoolaAft.length!=0) {
        setOutNumBoola("증가");
      }
      else if((outNumBoolbAft.length>=outNumBoolbBef.length)&&outNumBoolbAft!=0) {
        setOutNumBoolb("증가");
      }
      else if((outNumBoolaAft.length<outNumBoolaBef.length)||outNumBoolaAft==0) {
        setOutNumBoola("감소");
      }
      else if((outNumBoolbAft.length<outNumBoolbBef.length)||outNumBoolbAft==0) {
        setOutNumBoolb("감소");
      }
    };
  
    useEffect(() => {
      numBool();
    });
    
    //const petURL='./'+opetURL[0];//opetN[0].photoURL
    //var petURL=require('./'+opetURL[0]);

    const petNamea=Array.from(new Set(opetN))[0];
    const outNuma=outNumBoolaAft.length;
    const outTimea="00:09";
    const NumBoola=outNumBoola;
    const TimeBoola="감소";
    const petNameb=Array.from(new Set(opetN))[1];
    const outNumb=outNumBoolbAft.length;
    const outTimeb="00:03";
    const NumBoolb=outNumBoolb;
    const TimeBoolb="증가";
    const obja={
      '2021-11-02': {marked: true, selected: true, selectedColor: '#FF6600', dotColor: '#FF6600'},
      '2021-11-03': {marked: true, selected: true, selectedColor: '#FFCC66', dotColor: '#FFCC66'},
      '2021-11-06': {marked: true, selected: true, selectedColor: '#FFCC66', dotColor: '#FFCC66'},
      '2021-11-07': {marked: true, selected: true, selectedColor: '#FF6600', dotColor: '#FF6600'}
   };
   const objb={
    '2021-11-02': {marked: true, selected: true, selectedColor: '#FF6600', dotColor: '#FF6600'},
    '2021-11-04': {marked: true, selected: true, selectedColor: '#FFCC66', dotColor: '#FFCC66'},
    '2021-11-06': {marked: true, selected: true, selectedColor: '#FFCC66', dotColor: '#FFCC66'},
    '2021-11-14': {marked: true, selected: true, selectedColor: '#FF6600', dotColor: '#FF6600'}
   };
    
    if(Array.from(new Set(opetList)).length>1) {
      return (
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            <Image style={styles.petimage} source={require('../asset/pet1.png')} />
            <Text style={styles.name}>{petNamea}</Text>
            <View style={styles.numavg}>
              <Text style={styles.outinfo}>
                {outNuma}회<Text style={styles.textinfo}>{"\n"}산책 횟수</Text>
              </Text>
              <Text style={styles.outinfo}>
                {outTimea}<Text style={styles.textinfo}>{"\n"}평균 산책 시간</Text>
              </Text>
            </View>
            <Calendar style={{
              width: screenWidth, 
              borderWidth: 5, 
              borderTopColor: '#FF9900', 
              borderBottomColor: '#FF9900', 
              borderLeftColor: '#FFFFFF', 
              borderRightColor: '#FFFFFF',
              paddingHorizontal: 10, 
            }}
              current={calStart}
              minDate={calStart}
              maxDate={calEnd}
              markedDates= {obja}
              monthFormat={'yyyy MM'}
              hideArrows={true}
              renderArrow={(direction) => (<Arrow/>)}
              hideExtraDays={false}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={true}
              disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={(date) => {}}
            />
            <View>
              <Text style={styles.explain}>지난달 대비</Text>
            </View>
            <View style={styles.numavg}>
              <Text style={styles.explains}>산책 횟수 </Text>
              <Text style={styles.explainnum}>{ NumBoola },</Text>
              <Text style={styles.explains}> 산책 시간 </Text>
              <Text style={styles.explainnum}>{ TimeBoola }</Text>
            </View>
          </View>
  
          <View style={styles.container}>
            <Image style={styles.petimage} source={require('../asset/pet2.png')} />
            <Text style={styles.name}>{petNameb}</Text>
            <View style={styles.numavg}>
              <Text style={styles.outinfo}>
                {outNumb}회<Text style={styles.textinfo}>{"\n"}산책 횟수</Text>
              </Text>
              <Text style={styles.outinfo}>
                {outTimeb}<Text style={styles.textinfo}>{"\n"}평균 산책 시간</Text>
              </Text>
            </View>
            <Calendar style={{
              width: screenWidth, 
              borderWidth: 5, 
              borderTopColor: '#FF9900', 
              borderBottomColor: '#FF9900', 
              borderLeftColor: '#FFFFFF', 
              borderRightColor: '#FFFFFF',
              paddingHorizontal: 10,
            }}
              current={calStart}
              minDate={calStart}
              maxDate={calEnd}
              markedDates= {objb}
              monthFormat={'yyyy MM'}
              hideArrows={true}
              renderArrow={(direction) => (<Arrow/>)}
              hideExtraDays={false}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={true}
              disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={(date) => {}}
            />
            <View>
              <Text style={styles.explain}>지난달 대비</Text>
            </View>
            <View style={styles.numavg}>
              <Text style={styles.explains}>산책 횟수 </Text>
              <Text style={styles.explainnum}>{ NumBoolb },</Text>
              <Text style={styles.explains}> 산책 시간 </Text>
              <Text style={styles.explainnum}>{ TimeBoolb }</Text>
            </View>
          </View>
        </ScrollView>
      );
    }
    else if(Array.from(new Set(opetList)).length==1) {
      return (
        <View style={styles.container}>
            <Image style={styles.petimage} source={require('../asset/pet1.png')} />
            <Text style={styles.name}>{petNamea}</Text>
            <View style={styles.numavg}>
              <Text style={styles.outinfo}>
                {outNuma}회<Text style={styles.textinfo}>{"\n"}산책 횟수</Text>
              </Text>
              <Text style={styles.outinfo}>
                {outTimea}<Text style={styles.textinfo}>{"\n"}평균 산책 시간</Text>
              </Text>
            </View>
            <Calendar style={{
              width: screenWidth, 
              borderWidth: 5, 
              borderTopColor: '#FF9900', 
              borderBottomColor: '#FF9900', 
              borderLeftColor: '#FFFFFF', 
              borderRightColor: '#FFFFFF',
              paddingHorizontal: 5, 
            }}
              current={calStart}
              minDate={calStart}
              maxDate={calEnd}
              markedDates= {obja}
              monthFormat={'yyyy MM'}
              hideArrows={true}
              renderArrow={(direction) => (<Arrow/>)}
              hideExtraDays={false}
              disableMonthChange={true}
              firstDay={7}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={true}
              disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={(date) => {}}
            />
            <View>
              <Text style={styles.explain}>지난달 대비</Text>
            </View>
            <View style={styles.numavg}>
              <Text style={styles.explains}>산책 횟수 </Text>
              <Text style={styles.explainnum}>{ NumBoola },</Text>
              <Text style={styles.explains}> 산책 시간 </Text>
              <Text style={styles.explainnum}>{ TimeBoola }</Text>
            </View>
          </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>...</Text>
        </View>
      );
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //marginTop: 25,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbutton: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 20,
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
  },
  petimage: {
    width: '100%',
    height: '16%',
    top: 20,
    resizeMode:'contain',
  },
  numavg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outinfo: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: '8%',
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  textinfo: {
    fontSize: 13,
    alignItems: 'center',
    color: '#999999',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  explain: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    paddingTop: 5,
    textAlign: 'center',
  },
  explains: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    paddingTop: 3,
    textAlign: 'center',
    paddingLeft: '5%',
  },
  explainnum: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 1,
    paddingTop: 3,
    textAlign: 'center',
    color: '#FF9900',
    paddingLeft: '3%',
  },
});
*/