import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from './trpc';
import { Text, View, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [users, setUsers] = useState([]);

  const handleGreeting = async () => {
    const response = await trpc.greeting.query({ name });
    setGreeting(response.greeting);
  };

  const handleUser = async () => {
    const response = await trpc.getUsers.query();
    setUsers(response);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ padding: 20, marginTop: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter your name:</Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 20,
            borderRadius: 5,
          }}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
        <Button title="Fetch Greeting" onPress={handleGreeting} color="red" />
        {greeting && <Text style={{ marginTop: 20, fontSize: 20 }}>{greeting}</Text>}

        <Button title="Fetch Users" onPress={handleUser} color="blue" />


        {users.length > 0 && (
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Age</Text>
            </View>

            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                  <Text style={styles.tableCell}>{item.age}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 20
  },
});
