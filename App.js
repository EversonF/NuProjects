import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [offset, opacity, logo]);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
      }),
    ]).start();
  }
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./assets/Logo2.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <TextInput
          style={[styles.input, { width: '100%', backgroundColor: '#F8F8FF', height: 50, borderWidth: 2, borderRadius: 15, borderColor: '#00fff7' }]}
          placeholder="Usuario"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={[styles.input, { width: '100%', height: 50, backgroundColor: '#F8F8FF', borderWidth: 2, borderRadius: 15, borderColor: '#00fff7' }]}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={[styles.btnSubmit, { backgroundColor: '#191970', borderRadius: 15, height: 30, width: '90%' }]}>
          <Text style={[styles.submitText, { textAlign: 'center' }]}>Acessar</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
});
