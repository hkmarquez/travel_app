import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = Math.floor(width / 7);

const HEADER_HEIGHT = 40 + 20 + 34 + 20;
const WEEKDAY_HEIGHT = 30;
const GRID_ROWS = 6;
const CELL_HEIGHT = Math.floor((height - 84 - HEADER_HEIGHT - WEEKDAY_HEIGHT) / GRID_ROWS);

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m, y) => new Date(y, m, 1).getDay();
  const getDaysInPrevMonth = (m, y) => new Date(y, m, 0).getDate();

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDay(currentMonth, currentYear);
    const daysInPrev = getDaysInPrevMonth(currentMonth, currentYear);
    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: daysInPrev - firstDay + 1 + i, type: 'prev' });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, type: 'current' });
    }
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ day: i, type: 'next' });
    }
    return cells;
  };

  const handlePrev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const handleNext = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const isToday = (day, type) =>
    type === 'current' &&
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const monthLabel = new Date(currentYear, currentMonth).toLocaleString('default', {
    month: 'long', year: 'numeric',
  });

  const cells = generateCalendar();

  return (
    <SafeAreaView className="bg-primary h-full justify-center">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrev} style={styles.navBtn}>
            <Text style={styles.navText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <TouchableOpacity onPress={handleNext} style={styles.navBtn}>
            <Text style={styles.navText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Weekday headers */}
        <View style={styles.weekdays}>
          {daysOfWeek.map((d, i) => (
            <Text key={i} style={styles.weekdayText}>{d}</Text>
          ))}
        </View>

        {/* Day grid */}
        <View style={styles.grid}>
          {cells.map((cell, i) => (
            <TouchableOpacity
              key={i}
              style={styles.cellWrapper}
              onPress={() => {
                if (cell.type === 'current') {
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
                  router.push({ pathname: '/home', params: { date: dateStr } });
                }
              }}
              activeOpacity={cell.type === 'current' ? 0.7 : 1}
            >
              <View style={[styles.cell, isToday(cell.day, cell.type) && styles.todayCell]}>
                <Text style={[
                  styles.dayText,
                  cell.type !== 'current' && styles.mutedText,
                  isToday(cell.day, cell.type) && styles.todayText,
                ]}>
                  {cell.day}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 84,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 22,
    color: '#fff',
    lineHeight: 26,
  },
  monthLabel: {
    fontSize: 21,
    fontWeight: '500',
    color: '#fff',
  },
  weekdays: {
    flexDirection: 'row',
    height: WEEKDAY_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    marginBottom: 0,
  },
  weekdayText: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '500',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
  cellWrapper: {
    width: CELL_SIZE,
    height: CELL_HEIGHT,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  cell: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  todayCell: {
    backgroundColor: '#534AB7',
  },
  dayText: {
    fontSize: 13,
    color: '#fff',
  },
  mutedText: {
    color: '#3a3a4a',
  },
  todayText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default Calendar;