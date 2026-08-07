import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flex: 7,
  },

  headerRight: {
    flex: 3,
    alignItems: 'flex-end',
    gap: 10,
  },

  headerRow: {
    flexDirection: 'row',
  },

  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },

  date: {
    fontSize: 13,
    color: '#b0b7c4',
    fontWeight: '500',
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
  },

  body: {
    fontSize: 15,
    color: '#b0b7c4',
    lineHeight: 22,
  },

  image: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
  },
});
