// import React, {useState} from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { styles } from '../styles/createStyles';   // adjust path if needed
//
//
// const DayCard = ({
//   dateObj,
//   tasks,
//   state,
//   onPress,
//   openAddModal,
//   collapseEdit,
//   images,
// }) => {
//   const key = dateObj.toISOString();
//   const dayNum = String(dateObj.getDate()).padStart(2, '0');
//   const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dateObj.getDay()];
//   const firstTask = tasks[0];
//   const [viewMode, setViewMode] = useState(false);
//
//   return (
//     <TouchableOpacity
//       key={key}
//       style={[
//         styles.card,
//         state && styles.cardExpanded,
//         state === 'edit' && styles.cardEditMode,
//       ]}
//       activeOpacity={0.88}
//       onPress={onPress}
//     >
//       <Image source={images.homepage_bg} style={styles.cardBg} resizeMode="cover" />
//
//       <LinearGradient
//         colors={
//           state === 'edit'
//             ? ['rgba(0,0,0,0.78)', 'rgba(0,0,0,0.65)']
//             : ['rgba(0,0,0,0.62)', 'rgba(0,0,0,0.28)']
//         }
//         style={{ ...StyleSheet.absoluteFillObject }}
//       />
//
//       {/* ─────────────────────────────── EDIT MODE ─────────────────────────────── */}
//       {state === 'edit' ? (
//         <View style={styles.editModeRow}>
//           {/* Left date column */}
//           <View style={styles.dateColEdit}>
//             <Text style={styles.dayNum}>{dayNum}</Text>
//             <Text style={styles.dayName}>{dayName}</Text>
//           </View>
//
//           <View style={styles.editDivider} />
//
//           {/* Centered edit actions */}
//           <View style={styles.editActions}>
//             <TouchableOpacity
//               style={styles.editActionBtn}
//               onPress={() => openAddModal(dateObj)}
//             >
//               <Icon name="edit" size={32} color="rgba(255,255,255,0.9)" />
//             </TouchableOpacity>
//
//             <TouchableOpacity
//               style={styles.editActionBtn}
//               onPress={() => setViewMode(true)}
//             >
//               <Icon name="list" size={32} color="rgba(255,255,255,0.9)" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         /* ───────────────────────────── COLLAPSED MODE ───────────────────────────── */
//         <>
//           <View style={styles.dateCol}>
//             <Text style={styles.dayNum}>{dayNum}</Text>
//             <Text style={styles.dayName}>{dayName}</Text>
//           </View>
//
//           <View style={styles.divider} />
//
//           <View style={styles.contentCol}>
//             <Text style={styles.cardTitle} numberOfLines={1}>
//               {firstTask ? firstTask.name.toUpperCase() : 'INSERT TITLE'}
//             </Text>
//
//             <View style={styles.taskRow}>
//               <Icon name="place" size={11} color="rgba(255,255,255,0.55)" />
//               <Text style={styles.taskName} numberOfLines={1}>
//                 {firstTask?.location?.label ?? 'Add a location'}
//               </Text>
//             </View>
//           </View>
//         </>
//       )}
//     </TouchableOpacity>
//   );
// };
//
// export default DayCard;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { styles } from '../styles/createStyles';

const DayCard = ({
  dateObj,
  tasks,
  state,
  onPress,
  openAddModal,
  collapseEdit,
  images,
}) => {
  const key = dateObj.toISOString();
  const dayNum = String(dateObj.getDate()).padStart(2, '0');
  const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dateObj.getDay()];
  const firstTask = tasks[0];

  return (
    <TouchableOpacity
      key={key}
      style={[
        styles.card,
        state && styles.cardExpanded,
        state === 'edit' && styles.cardEditMode,
      ]}
      activeOpacity={0.88}
      onPress={onPress}
    >
      <Image
        source={images.homepage_bg}
        style={styles.cardBg}
        resizeMode="cover"
      />

      <LinearGradient
        colors={
          state === 'edit'
            ? ['rgba(0,0,0,0.78)', 'rgba(0,0,0,0.65)']
            : ['rgba(0,0,0,0.62)', 'rgba(0,0,0,0.28)']
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* ─────────────────────────────── EDIT MODE ─────────────────────────────── */}
      {state === 'edit' ? (
        <View style={styles.editModeRow}>
          {/* Left date column */}
          <View style={styles.dateColEdit}>
            <Text style={styles.dayNum}>{dayNum}</Text>
            <Text style={styles.dayName}>{dayName}</Text>
          </View>

          <View style={styles.editDivider} />

          {/* Centered edit actions */}
          <View style={styles.editActions}>
            {/* EDIT BUTTON */}
            <TouchableOpacity
              style={styles.editActionBtn}
              onPress={() => openAddModal(dateObj)}
            >
              <Icon name="edit" size={32} color="rgba(255,255,255,0.9)" />
            </TouchableOpacity>

            {/* SELECT BUTTON → NAVIGATE TO VIEW PAGE */}
            <TouchableOpacity
              style={styles.editActionBtn}
              onPress={() => {
                router.push({
                  pathname: '/view',
                  params: {
                    dateObjJson: JSON.stringify(dateObj),
                    tasksJson: JSON.stringify(tasks),
                    imagesJson: JSON.stringify(images),
                  },
                });
              }}
            >
              <Icon name="list" size={32} color="rgba(255,255,255,0.9)" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* ───────────────────────────── COLLAPSED MODE ───────────────────────────── */
        <>
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
              <Icon name="place" size={11} color="rgba(255,255,255,0.55)" />
              <Text style={styles.taskName} numberOfLines={1}>
                {firstTask?.location?.label ?? 'Add a location'}
              </Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default DayCard;

