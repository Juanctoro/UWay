import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function RoundedButton({ title, onPress, disabled = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: '#8000ff',
    alignItems: 'center',
    marginTop: 6,
  },
  text: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
