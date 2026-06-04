import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  TextInput,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/createStyles'; // adjust path if needed

const MapPanel = ({
  mapOpen,
  mapHeight,
  expandMap,
  collapseMap,
  cameraRef,
  currentLocation,
  destinationCoord,
  routeGeoJSON,
  searchQuery,
  searchResults,
  showResults,
  onSearchChange,
  onSelectResult,
  onUserLocationUpdate,
}) => {
  return (
    <Animated.View style={[styles.mapPanel, { height: mapHeight }]}>
      {/* Handle bar */}
      <TouchableOpacity
        style={styles.mapHandle}
        onPress={() => (mapOpen ? collapseMap() : expandMap())}
        activeOpacity={0.8}
      >
        <View style={styles.mapHandlePill} />
        {!mapOpen && (
          <Text style={styles.mapHandleLabel}>
            <Icon name="map" size={13} color="#777" />  Tap to open map
          </Text>
        )}
      </TouchableOpacity>

      {mapOpen && (
        <View style={{ flex: 1 }}>
          {/* Map */}
          <MapLibreGL.MapView
            style={{ flex: 1 }}
            styleURL="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
          >
            <MapLibreGL.Camera ref={cameraRef} zoomLevel={12} />

            <MapLibreGL.UserLocation
              visible
              onUpdate={onUserLocationUpdate}
            />

            {/* Route line */}
            {routeGeoJSON && (
              <MapLibreGL.ShapeSource id="routeSource" shape={routeGeoJSON}>
                <MapLibreGL.LineLayer
                  id="routeLine"
                  style={{
                    lineColor: '#1E90FF',
                    lineWidth: 4,
                    lineCap: 'round',
                    lineJoin: 'round',
                  }}
                />
              </MapLibreGL.ShapeSource>
            )}

            {/* Destination pin */}
            {destinationCoord && (
              <MapLibreGL.PointAnnotation
                id="destination"
                coordinate={[destinationCoord.lon, destinationCoord.lat]}
              >
                <View style={styles.destPinOuter}>
                  <View style={styles.destPinInner} />
                </View>
              </MapLibreGL.PointAnnotation>
            )}
          </MapLibreGL.MapView>

          {/* Overlay UI */}
          <View style={styles.mapOverlay}>
            {/* Search bar */}
            <View style={styles.searchBar}>
              <Icon
                name="search"
                size={18}
                color="#666"
                style={{ marginRight: 8 }}
              />
              <TextInput
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholder="Search places"
                placeholderTextColor="#999"
                style={styles.searchInput}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => onSearchChange('')}>
                  <Icon name="close" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* Search results */}
            {showResults && searchResults.length > 0 && (
              <View style={styles.resultsContainer}>
                <FlatList
                  data={searchResults}
                  keyExtractor={(item, idx) => `${item.place_id}-${idx}`}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => onSelectResult(item)}
                    >
                      <Icon
                        name="place"
                        size={16}
                        color="#666"
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.resultText} numberOfLines={2}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* Buttons */}
            <View style={styles.mapBtnRow}>
              <TouchableOpacity
                style={styles.mapIconBtn}
                onPress={collapseMap}
              >
                <Icon name="keyboard-arrow-down" size={22} color="#555" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mapIconBtn}
                onPress={() => {
                  if (currentLocation && cameraRef.current) {
                    cameraRef.current.setCamera({
                      centerCoordinate: [
                        currentLocation.lon,
                        currentLocation.lat,
                      ],
                      zoomLevel: 14,
                      animationDuration: 800,
                    });
                  }
                }}
              >
                <Icon name="my-location" size={20} color="#1E90FF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default MapPanel;
