import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { fetchUpcomingEvents } from '../services/eventService';
import { formatDate } from '../utils/format';

function EventCard({ event }) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium">{event.name}</Text>
        <Text variant="labelSmall" style={styles.meta}>
          {formatDate(event.startDate)} · {event.location}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {event.description}
        </Text>
        <View style={styles.tagContainer}>
          <Chip compact>{event.category}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
}

export default function EventCalendarScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    setLoading(true);
    const data = await fetchUpcomingEvents();
    setEvents(data);
    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadEvents} />
        }
        ListHeaderComponent={
          <Text variant="headlineSmall" style={styles.heading}>
            K-Culture Event Calendar
          </Text>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
  },
  contentContainer: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  heading: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
  },
  meta: {
    marginTop: 8,
    opacity: 0.7,
  },
  description: {
    marginTop: 12,
    lineHeight: 20,
  },
  tagContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
});
