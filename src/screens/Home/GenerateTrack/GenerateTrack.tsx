import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Images} from '../../../constant/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
const GenerateTrack = ({navigation}: any) => {
  const [MusicGenre, setMusicGenre] = useState('pop');
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <ImageBackground
      style={{height: heightPercentageToDP('100%')}}
      source={Images.BG_1}>
      <SafeAreaView
        className="h-full "
        edges={['right', 'left', 'top', 'bottom']}>
        {/* // Search Box */}
        <View className="flex flex-row items-center justify-between px-4">
          <TouchableOpacity className="" onPress={() => navigation.goBack(' ')}>
            <MaterialIcons color="white" name="keyboard-arrow-left" size={42} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-white ">
            Generate Track
          </Text>

          <TouchableOpacity className="">
            <MaterialIcons color="white" name="close" size={32} />
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1 px-4 gap-y-4 ">
          <View className="gap-y-2">
            <Text className="text-lg font-semibold text-white">
              1. Select music genre
            </Text>
            <TouchableOpacity
              className="w-full py-3   bg-[#FFFFFF1A]   rounded-md   items-left    leading-2 px-5"
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <Text className="text-xl  text-left font-medium text-[#C6C3C6] ">
                {MusicGenre}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}>
              <View
                style={{
                  backgroundColor: '#190D1A',
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}>
                <Picker
                  selectedValue={MusicGenre}
                  onValueChange={(itemValue, itemIndex) => {
                    setMusicGenre(itemValue);
                    setIsModalVisible(false);
                  }}>
                  <Picker.Item color="white" label="Pop" value="pop" />
                  <Picker.Item color="white" label="Rock" value="rock" />
                  <Picker.Item color="white" label="Jazz" value="jazz" />
                  <Picker.Item color="white" label="Bass" value="bass" />
                </Picker>
              </View>
            </Modal>
          </View>
          <View className=" gap-y-2">
            <Text className="text-lg font-semibold text-white">
              2. Describe your track
            </Text>
            <TextInput
              placeholder="Relaxing video background track..."
              numberOfLines={4}
              multiline
              className="w-full py-3 text-xl font-medium h-[200]  bg-[#FFFFFF1A]   text-[#C6C3C6] rounded-md  items-center leading-2 px-5"
              placeholderTextColor="#C6C3C6"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-lg font-semibold text-white">
              3. Enter duration
            </Text>
            <TextInput
              placeholder="00:25"
              keyboardType="numeric"
              className="w-full py-3 text-xl font-medium  bg-[#FFFFFF1A] text-[#C6C3C6] rounded-md  items-center leading-2 px-5"
              placeholderTextColor="#C6C3C6"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GenerateTrack;
