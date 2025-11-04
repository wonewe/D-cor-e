import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { useAppContext } from '../store/AppContext';
import { fetchPersonalizedPhrases } from '../services/phrasebookService';

function PhraseCard({ phrase }) {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{phrase.korean}</Text>
        <Text variant="labelSmall" style={styles.pronunciation}>
          {phrase.pronunciation}
        </Text>
        <Text variant="bodyMedium" style={styles.french}>
          {phrase.french}
        </Text>
        <Text variant="labelSmall" style={styles.tip}>
          💡 {phrase.tips}
        </Text>
      </Card.Content>
    </Card>
  );
}

export default function PhrasebookScreen() {
  const {
    state: { travelerProfile },
  } = useAppContext();
  const [phrases, setPhrases] = useState([]);
  const [topicFilter, setTopicFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  async function loadPhrases() {
    const data = await fetchPersonalizedPhrases({
      proficiency: travelerProfile.proficiency,
      interests: travelerProfile.interests.join(','),
    });
    setPhrases(data);
  }

  useEffect(() => {
    loadPhrases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelerProfile.proficiency]);

  const filteredPhrases = useMemo(() => {
    return phrases.filter((phrase) => {
      const matchesTopic =
        topicFilter === 'all' || phrase.topic === topicFilter;
      const matchesSearch = phrase.french
        .toLowerCase()
        .includes(searchText.toLowerCase().trim());
      return matchesTopic && matchesSearch;
    });
  }, [phrases, topicFilter, searchText]);

  const topics = useMemo(() => {
    const base = new Set(['all']);
    phrases.forEach((phrase) => base.add(phrase.topic));
    return Array.from(base);
  }, [phrases]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        Carnet de phrases personnalisé
      </Text>
      <SegmentedButtons
        value={topicFilter}
        onValueChange={setTopicFilter}
        buttons={topics.map((topic) => ({
          value: topic,
          label: topic === 'all' ? 'Tous' : topic,
        }))}
        style={styles.segmented}
      />
      <TextInput
        mode="outlined"
        placeholder="Rechercher en français..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.search}
      />
      <FlatList
        data={filteredPhrases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PhraseCard phrase={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
    padding: 16,
  },
  heading: {
    marginBottom: 12,
  },
  segmented: {
    marginBottom: 12,
  },
  search: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    borderRadius: 12,
  },
  pronunciation: {
    marginTop: 6,
    opacity: 0.7,
  },
  french: {
    marginTop: 8,
  },
  tip: {
    marginTop: 12,
    color: '#555',
  },
});
