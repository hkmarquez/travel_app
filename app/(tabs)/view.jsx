import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../styles/createStyles';
import DayCard from '../../components/DayCard';

export default function ViewScreen() {
  const { dateObjJson, tasksJson, imagesJson } = useLocalSearchParams();

  const dateObj = dateObjJson ? new Date(JSON.parse(dateObjJson)) : new Date();
  const tasks = tasksJson ? JSON.parse(tasksJson) : [];
  const images = imagesJson ? JSON.parse(imagesJson) : {};

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>

        <LinearGradient
          colors={['#00AAFF', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.05 }}
          style={styles.viewHeaderRow}
        >
          <TouchableOpacity
            style={styles.viewBackBtn}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.viewBackText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewEditBtn}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.viewEditText}>Edit</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* ⭐ REAL DAY CARD */}
        <View style={{ marginTop: 20, marginHorizontal: 16 }}>
          <DayCard
            dateObj={dateObj}
            tasks={tasks}
            images={images}
            isPreview={true}
          />
        </View>

        {/* ⭐ NOTEPAD */}
        {/* ⭐ NOTEPAD WITH LINES */}
        <View style={styles.notepad}>
          {/* Render tasks */}
          {tasks.map((t) => (
            <Text key={t.id} style={styles.notepadLine}>
              • {t.name}
            </Text>
          ))}

          {/* Render blank lines */}
          {Array.from({ length: Math.max(12 - tasks.length, 6) }).map((_, i) => (
            <Text key={`blank-${i}`} style={styles.notepadLine}>
              {/* empty line */}
            </Text>
          ))}
        </View>


      </ScrollView>
    </View>
  );
}


