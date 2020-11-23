import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
let WebIM = (wx.WebIM = require("../../../utils/WebIM")["default"]);
// let WebIM = require("../../../utils/WebIM")["default"];

export default class ImDemo extends Component {
  componentWillMount() {}

  componentDidMount() {
    // // 初始化 IM
    // this.initIM();
    // // IM 加入聊天室
    // this.imJoinChatRoom();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 初始化 IM
  initIM() {
    console.log("初始化 IM...");

    const _this = this;

    // IM 全局 listen
    WebIM.conn.listen({
      onOpened(message) {
        console.log("im登录成功");
      },
      onReconnect() {
        qq.showToast({
          title: "重连中...",
          duration: 2000,
        });
      },
      onSocketConnected() {
        qq.showToast({
          title: "socket连接成功",
          duration: 2000,
        });
      },
      onClosed() {
        console.log("im  onClosed");
        WebIM.conn.close();
      },
      onInviteMessage(message) {},
      onReadMessage(message) {},
      onPresence(message) {
        console.log("onPresence", message);
      },
      onRoster(message) {},
      onVideoMessage(message) {
        console.log("onVideoMessage: ", message);
      },
      onAudioMessage(message) {
        console.log("onAudioMessage", message);
      },
      onCmdMessage(message) {
        console.log("onCmdMessage", message);
      },
      onTextMessage(message) {
        console.log("onTextMessage", message);
        // 更新在线列表
        playAudio.updatingOnlineList({ message: message });
        // 退出聊天室
        playAudio.passiveExitChatRoom({ message: message });
      },
      onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
      },
      onPictureMessage(message) {},
      onFileMessage(message) {
        console.log("onFileMessage", message);
      },
      onCustomMessage: function (message) {
        //收到自定义消息
        console.log("onCustomMessage:", message);
        // 播放音频
        playAudio.playSoundEffect({
          message: message,
          type: "onCustomMessage",
        });
        // 更新在线列表
        playAudio.updatingOnlineList({ message: message });
      },
      // 各种异常
      onError(error) {
        console.log("error:", error);
        // 16: server-side close the websocket connection
        // 8: offline by multi login
        // type: 206  message: "the user is already logged on another device"
        if (error.type == "206") {
          // 发布  退出聊天室
          playAudio.passiveExitChatRoom({ message: error, type: "forceExit" });
        }
      },
    });
  }

  // IM 加入聊天室
  imJoinChatRoom() {
    const _this = this;
    console.log("IM 加入聊天室");

    const options = {
      // roomId: roomId,
      roomId: "1099216325", // dev 晨会专用群
      success: function (res) {
        console.log("IM 加入聊天室 成功 res：", res);
      },
      error: function (err) {
        console.log("IM 加入聊天室 失败 err", err);
      },
    };
    // 加入聊天室
    WebIM.conn.joinChatRoom(options);
  }

  render() {
    return (
      <View className="imDemo">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
