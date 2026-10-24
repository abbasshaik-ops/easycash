
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import Svg, {
  Polyline,
  Line,
  Circle,
  Text as SvgText,
} from 'react-native-svg';

const money = (amount: number) =>
  '₹' + amount.toLocaleString('en-IN');

export default function App() {
  const [earlyPayment, setEarlyPayment] = useState(false);

  const cashNow = 1270000;
  const collections = earlyPayment ? 400000 : 150000;
  const outflows = 320000;
  const forecast = cashNow + collections - outflows;
  const [transactions, setTransactions] = useState<
  { id: number; type: 'Income' | 'Expense'; description: string; amount: number }[]
>([]);

const [transactionType, setTransactionType] = useState<'Income' | 'Expense'>('Income');
const [transactionDescription, setTransactionDescription] = useState('');
const [transactionAmount, setTransactionAmount] = useState('');
const [showTransactionForm, setShowTransactionForm] = useState(false);

const addTransaction = () => {
  const amount = Number(transactionAmount);

  if (!transactionDescription.trim() || !Number.isFinite(amount) || amount <= 0) {
    return;
  }

  setTransactions(previous => [
    {
      id: Date.now(),
      type: transactionType,
      description: transactionDescription.trim(),
      amount,
    },
    ...previous,
  ]);

  setTransactionDescription('');
  setTransactionAmount('');
  setShowTransactionForm(false);
};

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#101827" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>EasyCash</Text>
        <Text style={styles.subtitle}>
          Cash visibility for Indian businesses
        </Text>

        <View style={styles.hero}>
          <Text style={styles.muted}>TOTAL CASH AVAILABLE</Text>
<Text style={styles.balance}>
  {money(
    cashNow +
      transactions.reduce(
        (total, item) =>
          total + (item.type === 'Income' ? item.amount : -item.amount),
        0
      )
  )}
</Text>
          <Text style={styles.positive}>● Sample data · Demo only</Text>
          <View style={styles.divider} />
          <View style={styles.inline}>
            <View>
              <Text style={styles.muted}>Expected collections</Text>
              <Text style={styles.smallValue}>{money(collections)}</Text>
            </View>
            <View>
              <Text style={styles.muted}>Upcoming outflows</Text>
              <Text style={styles.smallValue}>{money(outflows)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Transactions</Text>

          <Pressable
            style={{
              backgroundColor: '#38BDF8',
              padding: 14,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 12,
            }}
            onPress={() => setShowTransactionForm(!showTransactionForm)}
          >
            <Text style={{ color: '#101827', fontWeight: 'bold' }}>
              {showTransactionForm ? 'Cancel' : '+ Add Transaction'}
            </Text>
          </Pressable>

          {showTransactionForm && (
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {(['Income', 'Expense'] as const).map(type => (
                  <Pressable
                    key={type}
                    onPress={() => setTransactionType(type)}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderRadius: 10,
                      alignItems: 'center',
                      backgroundColor:
                        transactionType === type ? '#38BDF8' : '#263449',
                    }}
                  >
                    <Text
                      style={{
                        color: transactionType === type ? '#101827' : '#FFFFFF',
                        fontWeight: 'bold',
                      }}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                placeholder="Description (e.g. Customer payment)"
                placeholderTextColor="#94A3B8"
                value={transactionDescription}
                onChangeText={setTransactionDescription}
                style={{
                  backgroundColor: '#263449',
                  color: '#FFFFFF',
                  padding: 13,
                  borderRadius: 10,
                }}
              />

              <TextInput
                placeholder="Amount in ₹"
                placeholderTextColor="#94A3B8"
                value={transactionAmount}
                onChangeText={setTransactionAmount}
                keyboardType="decimal-pad"
                style={{
                  backgroundColor: '#263449',
                  color: '#FFFFFF',
                  padding: 13,
                  borderRadius: 10,
                }}
              />

              <Pressable
                onPress={addTransaction}
                style={{
                  backgroundColor: '#22C55E',
                  padding: 14,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#101827', fontWeight: 'bold' }}>
                  Save Transaction
                </Text>
              </Pressable>
            </View>
          )}

          {transactions.map(item => (
            <View
              key={item.id}
              style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#334155',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                {item.description}
              </Text>
              <Text
                style={{
                  color: item.type === 'Income' ? '#4ADE80' : '#F87171',
                  marginTop: 4,
                }}
              >
                {item.type === 'Income' ? '+' : '−'}₹
                {item.amount.toLocaleString('en-IN')}
              </Text>
            </View>
          ))}

          {transactions.length === 0 && !showTransactionForm && (
            <Text style={styles.muted}>
              No transactions added yet. Tap the button to get started.
            </Text>
          )}
        </View>
<CashForecastChart />
        <Text style={styles.section}>Your accounts</Text>
        <View style={styles.card}>
          <Account name="HDFC Bank" amount={850000} />
          <Account name="ICICI Bank" amount={420000} />
          <Account name="Razorpay" amount={185000} />
          <Account name="UPI / Cash" amount={65000} last />
        </View>

        <Text style={styles.section}>30-day cash outlook</Text>
        <View style={styles.card}>
          <Text style={styles.muted}>Illustrative projected balance</Text>
          <Text style={styles.forecast}>{money(forecast)}</Text>
          <Text style={styles.note}>
            Starting cash + expected collections − expected outflows
          </Text>
          <View style={styles.divider} />
          <Text style={styles.switchTitle}>What if a customer pays early?</Text>
          <Text style={styles.note}>
            Mehta Traders pays ₹2,50,000 earlier than expected.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setEarlyPayment(!earlyPayment)}
            style={[
              styles.button,
              earlyPayment && styles.buttonActive,
            ]}
          >
            <Text style={styles.buttonText}>
              {earlyPayment ? 'Early payment included ✓' : 'Simulate early payment'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Pending receivables</Text>
        <View style={styles.card}>
          <View style={styles.inline}>
            <View>
              <Text style={styles.accountName}>Mehta Traders</Text>
              <Text style={styles.note}>Due in 5 days</Text>
            </View>
            <Text style={styles.receivable}>₹2,50,000</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.inline}>
            <View>
              <Text style={styles.accountName}>Kumar Distributors</Text>
              <Text style={styles.note}>Due in 12 days</Text>
            </View>
            <Text style={styles.receivable}>₹1,20,000</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          EASY CASH · DEMO PROTOTYPE · NOT CONNECTED TO BANKS
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Account({
  name,
  amount,
  last = false,
}: {
  name: string;
  amount: number;
  last?: boolean;
}) {
  return (
    <>
      <View style={styles.inline}>
        <Text style={styles.accountName}>{name}</Text>
        <Text style={styles.accountValue}>{money(amount)}</Text>
      </View>
      {!last && <View style={styles.divider} />}
    </>
  );
}

function CashForecastChart() {
  const values = [1270000, 1340000, 1210000, 1460000, 1380000, 1120000, 1340000];
  const points = values
    .map((value, index) => {
      const x = 12 + index * 46;
      const y = 110 - ((value - 1000000) / 500000) * 85;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={{ backgroundColor: '#172337', padding: 16, borderRadius: 18, marginBottom: 20 }}>
      <Text style={{ color: '#94A3B8', fontSize: 13 }}>
        CASH FLOW FORECAST
      </Text>
      <Text style={{ color: '#FFFFFF', fontSize: 23, fontWeight: 'bold', marginTop: 6 }}>
        30-day outlook
      </Text>
      <Text style={{ color: '#38BDF8', marginTop: 4, marginBottom: 12 }}>
        Illustrative projected cash balance
      </Text>

      <Svg width="100%" height={145} viewBox="0 0 300 130">
        <Line x1="10" y1="25" x2="290" y2="25" stroke="#334155" strokeDasharray="4 4" />
        <Line x1="10" y1="65" x2="290" y2="65" stroke="#334155" strokeDasharray="4 4" />
        <Line x1="10" y1="105" x2="290" y2="105" stroke="#334155" strokeDasharray="4 4" />
        <Polyline
          points={points}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {values.map((value, index) => {
          const x = 12 + index * 46;
          const y = 110 - ((value - 1000000) / 500000) * 85;
          return (
            <Circle key={index} cx={x} cy={y} r="3.5" fill="#38BDF8" />
          );
        })}
      </Svg>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#94A3B8', fontSize: 11 }}>Today</Text>
        <Text style={{ color: '#94A3B8', fontSize: 11 }}>Day 10</Text>
        <Text style={{ color: '#94A3B8', fontSize: 11 }}>Day 20</Text>
        <Text style={{ color: '#94A3B8', fontSize: 11 }}>Day 30</Text>
      </View>

      <Text style={{ color: '#FBBF24', fontSize: 12, marginTop: 12 }}>
        Demo projection only — not yet calculated from actual transactions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#101827' },
  content: { padding: 20, paddingBottom: 40 },
  brand: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#9BAAC0', fontSize: 14, marginTop: 4, marginBottom: 22 },
  hero: { backgroundColor: '#1C2A40', padding: 20, borderRadius: 18 },
  muted: { color: '#A7B5C9', fontSize: 12 },
  balance: { color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginVertical: 10 },
  positive: { color: '#65D6A3', fontSize: 12 },
  divider: { height: 1, backgroundColor: '#34445A', marginVertical: 14 },
  inline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginTop: 6 },
  section: { color: '#FFFFFF', fontSize: 19, fontWeight: '700', marginTop: 24, marginBottom: 12 },
  card: { backgroundColor: '#020201', padding: 18, borderRadius: 16 },
  accountName: { color: '#E5EDF7', fontSize: 14 },
  accountValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  forecast: { color: '#07d176', fontSize: 29, fontWeight: '800', marginTop: 8 },
  note: { color: '#A7B5C9', fontSize: 12, lineHeight: 18, marginTop: 6 },
  switchTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  button: { backgroundColor: '#2563EB', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonActive: { backgroundColor: '#15803D' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  receivable: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  footer: { color: '#7D8CA2', fontSize: 10, textAlign: 'center', marginTop: 26 },
});
