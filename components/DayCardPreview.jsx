import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/createStyles';

export default function DayCardPreview({ dateObj, firstTask, images }) {
  const dayNum = String(dateObj.getDate()).padStart(2, '0');
  const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dateObj.getDay()];

  return (
    <View style={[styles.card, { height: 140 }]}>
      <Image source={images.homepage_bg} style={styles.cardBg} resizeMode="cover" />

      <View style={styles.dateCol}>
        <Text style={styles.dayNum}>{dayNum}</Text>
        <Text style={styles.dayName}>{dayName}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.contentCol}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {firstTask ? firstTask.name.toUpperCase() : 'INSERT TITLE'}
        </Text>

        <View style={styles.taskRow}>
          <Text style={styles.taskName} numberOfLines={1}>
            {firstTask?.location?.label ?? 'Add a location'}
          </Text>
        </View>
      </View>
    </View>
  );
}
