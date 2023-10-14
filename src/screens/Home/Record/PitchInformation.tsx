import React, {ReactNode, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Circle, Svg} from "react-native-svg";

export const PitchInformation = ({
                                     pitchData,
                                     pitchDots,
                                     isRecording,
                                     isStartOver,
                                     setStartOver,
                                 }: any) => {

    interface PitchData {
        tone: string;
        frequency: number;
    }

    let pitchList: ReactNode[] = [];

    const pitchHeight = {
        'C': '126',
        'C#': '116',
        'D': '106',
        'D#': '96',
        'E': '86',
        'F': '76',
        'F#': '66',
        'G': '56',
        'G#': '46',
        'A': '36',
        'A#': '26',
        'B': '16'
    }

    pitchDots.forEach(function (dot: PitchData, i: number) {
        let position = 100;
        if (pitchDots.length == 110)
            position = i - 9;
        else
            position = i - 9 + 110 - pitchDots.length
        pitchList.push(
            <Circle
                cx={position.toString() + "%"}
                cy={pitchHeight[dot.tone]}
                r="16"
                fill="pink"/>
        );
    });

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (isStartOver) {
            setCurrentTime(0);
            setStartOver(false);
        }
    }, [isStartOver]);
    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setCurrentTime(currentTime + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [currentTime, isRecording]);

    return (
        <View>
            {
                pitchData.tone != null && pitchHeight[pitchData.tone] != null &&
                <Svg height="142" width="100%">
                    {pitchList}
                </Svg>
            }
            <View className="px-5 py-2">
                <Text
                    className="text-3xl font-bold "
                    style={{
                        paddingVertical: 20,
                        color: 'white',
                        textAlign: 'right',
                    }}>
                    {pitchData.tone}
                </Text>
            </View>
            <View className="px-5 py-2">
                <Text
                    className="text-3xl font-bold "
                    style={{
                        paddingVertical: 10,
                        color: 'white',
                        textAlign: 'right',
                    }}>
                    {pitchData.frequency != 0 ? pitchData.frequency : null}
                </Text>
            </View>
        </View>
    );
};