import { Text, View, ScrollView } from "react-native";
import React, { Component } from 'react'
import Dashboard from "../../components/admin/Dashboard/Dashboard";

export class Admin extends Component {
  render() {
    return (
      <ScrollView>
      <Dashboard />
      </ScrollView>
    )
  }
}

export default Admin
