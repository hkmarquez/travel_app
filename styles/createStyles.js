import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 16 },

  header: { paddingTop: 16, paddingBottom: 20 },
  headerDates: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a2e',
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 90,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#555',
  },
  cardExpanded: {
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  cardEditMode: {
    minHeight: 110,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  dateCol: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingTop: 18,
  },
  dayNum: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 30,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  contentCol: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  taskName: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontStyle: 'italic',
  },

  // Edit mode
  editModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateColEdit: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  editDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editActionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  // Map panel
  mapPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
    elevation: 10,
  },
  mapHandle: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  mapHandlePill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  mapHandleLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  mapOverlay: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 9,
    elevation: 5,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111' },

  resultsContainer: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 160,
    elevation: 5,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  resultText: { flex: 1, fontSize: 13, color: '#222' },

  mapBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  mapIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  destPinOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(220,38,38,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destPinInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#DC2626',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  modalCancel: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  modalSave: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },

   //VIEW MODE:

   viewHeaderRow: {
     width: '100%',
     paddingTop: 50,
     paddingHorizontal: 20,
     paddingBottom: 12,
     backgroundColor: '#3B82F6',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
   },

    viewBackBtn: {
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderRadius: 15,
      backgroundColor: '#003366',   // FIXED
    },

    viewEditBtn: {
      paddingVertical: 8,
      paddingHorizontal: 30,
      borderRadius: 15,
      backgroundColor: '#2CA6A4',   // FIXED
    },

    viewBackText: {
      color: '#fff',             // looks better on white
      fontSize: 16,
      fontWeight: '600',
    },

    viewEditText: {
      color: '#fff',             // looks better on white
      fontSize: 16,
      fontWeight: '600',
    },


   viewImage: {
     width: '100%',
     height: 260,
   },

   viewTitleRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 20,
     paddingVertical: 16,
   },

   viewDateText: {
     fontSize: 22,
     fontWeight: '700',
     color: '#333',
   },

   viewTitleText: {
     fontSize: 22,
     fontWeight: '700',
     color: '#333',
   },

   viewDetails: {
     paddingHorizontal: 20,
     paddingVertical: 10,
   },

   viewDetailText: {
     fontSize: 16,
     color: '#444',
     marginBottom: 8,
   },


   notepad: {
     marginTop: -10,
     marginHorizontal: 20,
     paddingVertical: 20,
     paddingHorizontal: 16,
     borderRadius: 12,
     backgroundColor: '#fff',
     borderWidth: 1,
     borderColor: '#ddd',
     minHeight: 500,
   },

   notepadLine: {
     fontSize: 16,
     color: '#333',
     paddingVertical: 8,
     borderBottomWidth: 1,
     borderBottomColor: '#eee',
   },

});
