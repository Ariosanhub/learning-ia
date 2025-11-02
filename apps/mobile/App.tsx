import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const mockTasks = [
  { id: '1', title: 'Enviar elogio para squad CX', status: 'Em progresso' },
  { id: '2', title: 'Preparar pauta 1:1', status: 'Agendado' }
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>CultureUP Mobile</Text>
        <Text style={styles.subheading}>Visão rápida das prioridades e rituais de pessoas.</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tarefas hoje</Text>
          {mockTasks.map((task) => (
            <View key={task.id} style={styles.listItem}>
              <Text style={styles.listItemTitle}>{task.title}</Text>
              <Text style={styles.listItemSubtitle}>{task.status}</Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progresso de OKRs</Text>
          <Text style={styles.listItemTitle}>OKR Crescimento · 62%</Text>
          <Text style={styles.listItemSubtitle}>Atualiza automaticamente com tarefas concluídas.</Text>
        </View>
        <View style={styles.cardSuccess}>
          <Text style={styles.cardTitleLight}>Último elogio</Text>
          <Text style={styles.listItemTitleLight}>Patrícia reconheceu Marcos por Ownership.</Text>
          <Text style={styles.listItemSubtitleLight}>"Obrigada por liderar o rollout do CultureUP Insights"</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F8'
  },
  content: {
    padding: 24,
    gap: 16
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#006A6A'
  },
  subheading: {
    fontSize: 14,
    color: '#4B5563'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  cardSuccess: {
    backgroundColor: '#00C896',
    borderRadius: 16,
    padding: 20
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E'
  },
  cardTitleLight: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#FFFFFF'
  },
  listItem: {
    marginBottom: 12
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E'
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#6B7280'
  },
  listItemTitleLight: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  listItemSubtitleLight: {
    fontSize: 12,
    color: '#E0FDF2'
  }
});
