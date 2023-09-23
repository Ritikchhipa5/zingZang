import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';

export default class extends Component<any, any> {
  render() {
    const {isVisible, onResumeRecord, onStopRecord, onEndRecording} =
      this.props;
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="items-center justify-center flex-1 ">
          <View className={'bg-[#683669] p-6 rounded-lg '}>
            <View>
              <Text className={'text-lg text-white text-left font-semibold'}>
                Your recording session has been paused. What would you like to
                do next?
              </Text>
              <Text
                className={
                  ' my-3 text-[#F6F5F6] text-left text-base font-semibold'
                }>
                If you're ready to add more to your recording select “Continue
                Recording”{'\n\n'} Select "Save for Comparison" to save your
                current recording for later review. You can listen to multiple
                takes and choose your best performance
              </Text>
            </View>
            <View className="flex gap-y-4">
              <TouchableOpacity
                onPress={() => onEndRecording()}
                className={`py-4 bg-[#F780FB] rounded-full `}>
                <Text className="text-xl font-semibold text-center text-black">
                  End Recording
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onResumeRecord()}
                className={`py-4 border-2 border-[#F780FB]  rounded-full `}>
                <Text className="text-xl font-semibold text-center text-[#F780FB]">
                  Continue Recording
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onStopRecord();
                }}
                className={`py-4 border-2 border-[#F780FB]  rounded-full `}>
                <Text className="text-xl font-semibold text-center text-[#F780FB]">
                  Save for Comparison
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
