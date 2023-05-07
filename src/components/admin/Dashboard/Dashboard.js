import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./DashboardStyle";
import CountUser from "./CountTotalUser/CountUser";
import CMT from "./CMTDepartment/CMTDeferment";
import CVL from "./CVLDepartment/CVL";
import RAC from "./RACDepartment/RAC";
import ELE from "./ELEDepartment/ELE";
import TOR from "./TORDepartment/TOR";
import FOOD from "./FOODDepartment/FOOD";
import Student from "./Student/Stuent";
import Teacher from "./Teacher/Teacher";
import Request from "./Request/Request";
import ApprovedUser from "./ApprovedUser/ApprovedUser";

export default function Dashboard() {
  return (
    <ScrollView style={{ marginBottom: 5 }}>
      <View style={styles.header}>
        <Text style={styles.textStyle1}>Hello, Welcome to,</Text>
        <Text style={styles.textStyle2}>Alumni Dashboard!</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<CountUser />}</View>
        <View style={styles.cartItem}>{<Request />}</View>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<ApprovedUser />}</View>
        <View style={styles.cartItem}>{<Teacher />}</View>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<Student />}</View>
        <View style={styles.cartItem}>{<CMT />}</View>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<CVL />}</View>
        <View style={styles.cartItem}>{<ELE />}</View>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<TOR />}</View>
        <View style={styles.cartItem}>{<FOOD />}</View>
      </View>
      <View style={styles.card}>
        <View style={styles.cartItem}>{<RAC />}</View>
      </View>
    </ScrollView>
  );
}
