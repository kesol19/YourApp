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
              renderHeader={(date) => {/*Return JSX*/}}
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
              renderHeader={(date) => {/*Return JSX*/}}
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
              renderHeader={(date) => {/*Return JSX*/}}
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