import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from 'react-native';
import { Container } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { COLOR, ERROR_MESSAGE, FONT, Icon_Back, Img_Edit_Profile_Background, MARGIN_TOP, SUCCESS_MESSAGE } from '../../constants';
import { ColorButton } from '../../components/Button';
import { IFile, IUser } from '../../interfaces/app';
import { useAuthentication, useUsers } from '../../hooks';
import { useGlobalState } from '../../redux/Store';


const { width: viewportWidth } = Dimensions.get('window');

export const SignUpAddProfilePictureConfirmScreen: React.FC = ({route}) => {

  const { navigate, goBack } = useNavigation();
  const { updateUserInformation } = useUsers();
  const { setLoginUser } = useAuthentication();

  const profile_icon: IFile = route.params.profile_icon;
  const userInfo: IUser = useGlobalState('userInfo');

  return (
    <Container style={styles.background}>
      
      <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={Img_Edit_Profile_Background} />

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Confirm Picture</Text>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.description_text}>If you need to make a change,</Text>
        <Text style={{...styles.description_text, marginTop: 0 }}>tap your profile picture below.</Text>

        <View style={styles.container}>
          <View style={styles.profile_container}>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Image style={styles.profile} source={{uri: profile_icon.uri}} />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.bottom_container}>
            <TouchableWithoutFeedback onPress={() => onContinue() }>
              <View style={{ ...styles.bottom_button, marginTop: 0 }}>
                <ColorButton title={'Continue'} backgroundColor={COLOR.whiteColor} color={COLOR.blackColor} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          
        </View>
      </SafeAreaView>
    </Container>
  );

  function onContinue() {
    updateUserInformation(userInfo.id, userInfo.email, userInfo.fullname, profile_icon, '', '')
    .then(async (result: Promise<IUser>) => {
      setLoginUser(await result);
      Alert.alert(SUCCESS_MESSAGE.UPDATE_USER_PROFILE_SUCCESS);
    }).catch(() => {
      Alert.alert(ERROR_MESSAGE.UPDATE_USER_PROFILE_FAIL);
    });
  }
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.blackColor, 
    alignItems: 'center',
  },
  safe_area: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  navigation_bar: {
    marginTop: MARGIN_TOP,
    width: '100%',
    height: 33,
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Bold, 
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  description_text: {
    marginTop: 33,
    marginLeft: 24,
    marginRight: 24,
    height: 23,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.systemWhiteColor,
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  profile_container: {
    width: '100%',
    height: '100%',
    bottom: 134,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_icon: {
    width: 46,
    height: 58,
  },
  bottom_container: {
    position: 'absolute',
    width: '100%',
    height: 134,
    flex: 1,
    bottom: 0,
    flexDirection: 'row',
  },
  bottom_button: {
    position: 'absolute',
    bottom: 33,
    marginLeft: 48,
    marginRight: 48,
    width: viewportWidth - 96,
    height: 44,
    flex: 1,
  },
});
