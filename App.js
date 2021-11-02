/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Input from './src/components/Form/Input';
import {pushNotif} from './src/notif/notif'
import { requestSendSMS} from './src/Permissions/Permissions';

import SmsAndroid from 'react-native-get-sms-android-v2';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

//var SmsAndroid = require('react-native-sms-android');

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [cellNumber, setCellNumber] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  const [recieveFrom, setRecieveFrom] = useState('09360832001');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    async function fetchData() {
      await requestSendSMS(() => {});
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.btnWrapper}>
            <Input
              //onBlur={setCellNumber}
              onChangeText={setCellNumber}
              value={cellNumber}
              keyboardType={'numeric'}
              label="شماره همراه"
              placeholder="مثال: 09123456789"
            />
            <Input
              //onBlur={setSmsMessage}
              onChangeText={setSmsMessage}
              value={smsMessage}
              label="پیام"
              placeholder="مثال: سلام، خوبی؟"
            />
            <View></View>
            <TouchableOpacity
              onPress={() => {
                if (cellNumber.length < 1) {
                  Alert.alert('شماره همراه را وارد کنید');
                  return;
                }

                if (smsMessage.length < 1) {
                  Alert.alert('پیام را وارد کنید');
                  return;
                }

                SmsAndroid.autoSend(
                  cellNumber,
                  smsMessage,
                  fail => {
                    console.log('Failed with this error: ' + fail);
                    Alert.alert('error: ' + fail);
                  },
                  success => {
                    console.log('SMS sent successfully');
                    Alert.alert('success!');
                  },
                );
              }}>
              <Text style={styles.btn}>ارسال</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.btnWrapper]}>
            <Input
              //onBlur={setRecieveFrom}
              onChangeText={setRecieveFrom}
              value={recieveFrom}
              keyboardType={'numeric'}
              label="دریافت از"
              placeholder="مثال: 09123456789"
            />
            <View></View>
            <TouchableOpacity
              //style={styles.btn}
              onPress={() => {
                /* List SMS messages matching the filter */
                var filter = {
                  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

                  /**
                   *  the next 3 filters can work together, they are AND-ed
                   *
                   *  minDate, maxDate filters work like this:
                   *    - If and only if you set a maxDate, it's like executing this SQL query:
                   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
                   *    - Same for minDate but with "date >= minDate"
                   */
                  //minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
                  //maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
                  //bodyRegex: '(.*)How are you(.*)', // content regex to match

                  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
                  //read: 0, // 0 for unread SMS, 1 for SMS already read
                  //_id: 1234, // specify the msg id
                  //thread_id: 12, // specify the conversation thread_id
                  address: `(.*)${recieveFrom.substring(1)}(.*)`, // sender's phone number regex match
                  //body: 'How are you', // content to match
                  /** the next 2 filters can be used for pagination **/
                  indexFrom: 0, // start from index 0
                  maxCount: 10, // count of SMS to return each time
                };

                SmsAndroid.list(
                  JSON.stringify(filter),
                  fail => {
                    console.log('Failed with this error: ' + fail);
                    Alert.alert('error: ' + fail);
                  },
                  (count, smsList) => {
                    console.log('Count: ', count);
                    console.log('List: ', smsList);
                    var arr = JSON.parse(smsList);
                    var msg = [];

                    arr.forEach(function (object) {
                      console.log('Object: ' + object);
                      console.log('-->' + object.date);
                      console.log('-->' + object.body);
                      msg.push(object.body);
                    });

                    if (msg.length > 0) {


                      pushNotif('1','پیامک','',msg.join(),true,'ch-1','','max');

                      //Alert.alert(msg.join());
                    } else {
                      Alert.alert('پیامی یافت نشد');
                    }
                  },
                );
              }}>
              <Text style={styles.btn}>دریافت</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.btnWrapper]}>
            <TouchableOpacity
              //style={styles.btn}
              onPress={async() => {
                /* List SMS messages matching the filter */
                var filter = {
                  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

                  /**
                   *  the next 3 filters can work together, they are AND-ed
                   *
                   *  minDate, maxDate filters work like this:
                   *    - If and only if you set a maxDate, it's like executing this SQL query:
                   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
                   *    - Same for minDate but with "date >= minDate"
                   */
                  //minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
                  //maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
                  //bodyRegex: '(.*)How are you(.*)', // content regex to match

                  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
                  //read: 0, // 0 for unread SMS, 1 for SMS already read
                  //_id: 1234, // specify the msg id
                  //thread_id: 12, // specify the conversation thread_id
                  address: `(.*)${recieveFrom.substring(1)}(.*)`, // sender's phone number regex match
                  //body: 'How are you', // content to match
                  /** the next 2 filters can be used for pagination **/
                  indexFrom: 0, // start from index 0
                  maxCount: 10, // count of SMS to return each time
                };
              
                  SmsAndroid.list(
                    JSON.stringify(filter),
                    fail => {
                      console.log('Failed with this error: ' + fail);
                      Alert.alert('error: ' + fail);
                    },
                    (count, smsList) => {
                      console.log('Count: ', count);
                      console.log('List: ', smsList);
                      var arr = JSON.parse(smsList);
                      var count = 0;
                      var msg = [];

                      arr.forEach(function (object) {
                        console.log(object._id);
                        SmsAndroid.delete(
                          object._id,
                          fail => {
                            console.log('Failed with this error: ' + fail);
                            msg.push(fail);
                          },
                          success => {
                            console.log('SMS deleted successfully');
                            count++;
                          },
                        );
                      });

                      if (count > 0) {
                        Alert.alert(count + ' پیام حذف شد');
                      } else {
                        Alert.alert('پیامی یافت نشد. ' + msg.join());
                      }
                    },
                  );
                
              }}>
              <Text style={styles.btn}>حذف</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  btnWrapper: {
    // margin: 20,
    //height: 100,
    padding: 10,
    paddingHorizontal: 40,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: '#3ca423',
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#efefef',
    elevation: 5,
  },
});

export default App;
