import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';
import { fetchWeeklyTrends } from '../services/trendService';
import { formatDate } from '../utils/format';

function TrendCard({ trend }) {
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{trend.title}</Text>
        <Text variant="labelSmall" style={styles.category}>
          {trend.category}
        </Text>
        <Text variant="bodyMedium" style={styles.summary}>
          {trend.summary}
        </Text>
        <View style={styles.meta}>
          <Text variant='labelSmall'>
            Publié le {formatDate(trend.publishedAt)}
          </Text>
        </View>
        <View style={styles.tags}>
          {(trend.tags ?? []).map((tag) => (
            <Chip key={tag} compact style={styles.chip}>
              #{tag}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

export default function TrendReportScreen() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTrends() {
    setLoading(true);
    const data = await fetchWeeklyTrends();
    setTrends(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTrends();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={trends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TrendCard trend={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadTrends} />
        }
        ListHeaderComponent={
          <Text variant="headlineSmall" style={styles.heading}>
            Weekly Trend Decoder
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  heading: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  summary: {
    marginTop: 12,
  },
  meta: {
    marginTop: 16,
  },
  tags: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  category: {
    marginTop: 4,
    opacity: 0.7,
  },
  chip: {
    backgroundColor: '#E8EEF5',
  },
});
