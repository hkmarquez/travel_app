import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DayCard from '../../components/DayCard';
import MapPanel from '../../components/MapPanel';
import AddTaskModal from '../../components/AddTaskModal';

import {
  parseLocaleDate,
  buildDateRange,
  formatHeaderDates,
  dateKey,
} from '../../utils/dateHelpers';

import {
  fetchRoute,
  searchPlaces,
  handleUserLocationUpdate,
} from '../../utils/mapHelpers';

import { styles } from '../../styles/createStyles';
import { images } from '../../constants'; // adjust if needed

const MAP_COLLAPSED = 120;
const MAP_EXPANDED = 420;

export default function Create() {
  const { task } = useLocalSearchParams();

const match = task?.match(/^(.*?)\s*\((.*?)\s*[→\-—to]+\s*(.*?)\)$/i);

const tripName = match ? match[1] : task || 'My Trip';
const startDate = match ? parseLocaleDate(match[2]) : null;
const endDate = match ? parseLocaleDate(match[3]) : null;

const allDates =
  startDate && endDate ? buildDateRange(startDate, endDate) : [];

const headerLabel =
  startDate && endDate
    ? formatHeaderDates(startDate, endDate)
    : 'Select Dates';

  // ───────────────────────────────────────────────────────────────
  // State
  // ───────────────────────────────────────────────────────────────
  const [tasksByDate, setTasksByDate] = useState({});
  const [cardState, setCardState] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');

  // Map
  const mapHeight = useRef(new Animated.Value(MAP_COLLAPSED)).current;
  const [mapOpen, setMapOpen] = useState(false);
  const cameraRef = useRef(null);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationCoord, setDestinationCoord] = useState(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // ───────────────────────────────────────────────────────────────
  // Map expand/collapse
  // ───────────────────────────────────────────────────────────────
  const expandMap = () => {
    setMapOpen(true);
    Animated.spring(mapHeight, {
      toValue: MAP_EXPANDED,
      useNativeDriver: false,
    }).start();
  };

  const collapseMap = () => {
    setMapOpen(false);
    Animated.spring(mapHeight, {
      toValue: MAP_COLLAPSED,
      useNativeDriver: false,
    }).start();
  };

  // ───────────────────────────────────────────────────────────────
  // Card press logic (collapsed ↔ edit)
  // ───────────────────────────────────────────────────────────────
  const handleCardPress = (dateObj) => {
    const key = dateKey(dateObj);
    const tasks = tasksByDate[key] || [];
    const current = cardState[key];

    if (!current) {
      setCardState((prev) => ({ ...prev, [key]: 'edit' }));
      if (!mapOpen) expandMap();

      const firstLoc = tasks.find((t) => t.location)?.location;
      if (firstLoc && cameraRef.current) {
        setDestinationCoord(firstLoc);
        cameraRef.current.setCamera({
          centerCoordinate: [firstLoc.lon, firstLoc.lat],
          zoomLevel: 14,
          animationDuration: 800,
        });
        if (currentLocation) fetchRoute(currentLocation, firstLoc);
      }
      return;
    }

    if (current === 'edit') {
      setCardState((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // ───────────────────────────────────────────────────────────────
  // Task modal
  // ───────────────────────────────────────────────────────────────
  const openAddModal = (dateObj) => {
    setModalDate(dateObj);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    if (!newTaskName.trim() || !modalDate) return;
    const key = dateKey(modalDate);

    setTasksByDate((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        { id: Date.now(), name: newTaskName.trim(), location: null },
      ],
    }));

    setNewTaskName('');
    setModalVisible(false);
  };

  // ───────────────────────────────────────────────────────────────
  // Search + routing
  // ───────────────────────────────────────────────────────────────
  const onSearchChange = async (text) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    const results = await searchPlaces(text);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleSelectResult = async (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    setDestinationCoord({ lat, lon });
    setSearchQuery(item.display_name);
    setShowResults(false);

    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [lon, lat],
        zoomLevel: 14,
        animationDuration: 800,
      });
    }

    if (currentLocation) {
      const geometry = await fetchRoute(currentLocation, { lat, lon });
      if (geometry) {
        setRouteGeoJSON({
          type: 'Feature',
          geometry,
          properties: {},
        });
      }
    }
  };

  const onUserLocationUpdate = (loc) => {
    const parsed = handleUserLocationUpdate(loc);
    if (parsed) setCurrentLocation(parsed);
  };

  // ───────────────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────────────
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerDates}>{headerLabel}</Text>
            <Text style={styles.headerTitle}>{tripName}</Text>
          </View>

          {allDates.map((d) => {
            const key = dateKey(d);
            return (
              <DayCard
                key={key}
                dateObj={d}
                tasks={tasksByDate[key] || []}
                state={cardState[key]}
                images={images}
                onPress={() => handleCardPress(d)}
                openAddModal={openAddModal}
                collapseEdit={() =>
                  setCardState((prev) => ({ ...prev, [key]: undefined }))
                }
              />
            );
          })}
        </ScrollView>

        <MapPanel
          mapOpen={mapOpen}
          mapHeight={mapHeight}
          expandMap={expandMap}
          collapseMap={collapseMap}
          cameraRef={cameraRef}
          currentLocation={currentLocation}
          destinationCoord={destinationCoord}
          routeGeoJSON={routeGeoJSON}
          searchQuery={searchQuery}
          searchResults={searchResults}
          showResults={showResults}
          onSearchChange={onSearchChange}
          onSelectResult={handleSelectResult}
          onUserLocationUpdate={onUserLocationUpdate}
        />

        <AddTaskModal
          visible={modalVisible}
          modalDate={modalDate}
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
          onClose={() => {
            setModalVisible(false);
            setNewTaskName('');
          }}
          onSave={handleAddTask}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
