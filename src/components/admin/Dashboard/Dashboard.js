import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import styles from "./DeshboardStyle";
import CountCard from "./CountCard/CountCard";
import { COLORS } from "../../../constants/theme";

export default function Dashboard() {
  return (
    <ScrollView style={{ marginBottom: 20 }}>
      <View style={styles.header}>
        <Text style={styles.textStyle1}>Hello, Welcome to,</Text>
        <Text style={styles.textStyle2}>Alumni Dashboard!</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>
          {<CountCard name="Total User" count="1290" icon="users" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Students" count="1200" icon="user-graduate" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Teachers" count="90" icon="chalkboard-teacher" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Total" count="1200" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Approved" count="900" icon="check-circle" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Request" count="120" icon="hand-holding-heart" />}
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 18,
          textTransform: "uppercase",
          marginBottom: 10,
          color: COLORS.gray,
        }}
      >
        Department wise Student
      </Text>
      <View style={styles.card}>
        <View style={styles.cartItem}>
          {<CountCard name="computer" count="120" icon="desktop" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="civil" count="200" icon="home" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="Food" count="300" icon="hamburger" />}
        </View>

        <View style={styles.cartItem}>
          {<CountCard name="Electrical" count="200" icon="network-wired" />}
        </View>
        <View style={styles.cartItem}>
          {<CountCard name="THM" count="120" icon="hand-holding-heart" />}
        </View>  
        <View style={styles.cartItem}>
          {<CountCard name="RAC" count="120" icon="hand-holding-heart" />}
        </View>
      </View>
    </ScrollView>
  );
}
