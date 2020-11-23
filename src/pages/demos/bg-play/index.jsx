import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

const backgroundAudioManager = Taro.getBackgroundAudioManager();

export default class BgPlay extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.play();
  }

  componentDidHide() {}

  play() {
    const url = "https://yd-pull-l.cztv.com/channels/lantian/fm88_128k.m3u8";
    // const url =
    // "http://freedomspeak.oss-cn-beijing.aliyuncs.com/mini/audio/blankAudio.wav"; // 默认播放链接

    backgroundAudioManager.protocol = "hls";
    backgroundAudioManager.title = "此时此刻";
    backgroundAudioManager.epname = "此时此刻";
    backgroundAudioManager.singer = "许巍";
    backgroundAudioManager.coverImgUrl =
      "https://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000";
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = url;
  }

  render() {
    return (
      <View className="bg-play">
        <Text>BgPlay</Text>
      </View>
    );
  }
}
