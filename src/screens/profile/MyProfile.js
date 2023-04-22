import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const MyProfile = () => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{marginBottom: 50, marginTop: 20}}>
        <Text>
          In React Native, a "require cycle" occurs when two or more modules
          require each other in a circular manner. For example, in your case,
          AuthStack.js requires BottomTab.js, which in turn requires
          AuthStack.js again, creating a circular dependency. While require
          cycles are allowed in React Native, they can cause issues with
          uninitialized values, which can result in unexpected behavior or even
          crashes in your application. Therefore, it's generally a good idea to
          refactor your code to remove the need for a cycle. To fix this issue,
          you can refactor your code to remove the circular dependency between
          AuthStack.js and BottomTab.js. One way to do this is to extract the
          common code into a separate module and import it into both
          AuthStack.js and BottomTab.js, instead of requiring one module from
          the other. This way, you can avoid the circular dependency and still
          share the common code between the two modules.
        </Text>
        <Text>
          In React Native, a "require cycle" occurs when two or more modules
          require each other in a circular manner. For example, in your case,
          AuthStack.js requires BottomTab.js, which in turn requires
          AuthStack.js again, creating a circular dependency. While require
          cycles are allowed in React Native, they can cause issues with
          uninitialized values, which can result in unexpected behavior or even
          crashes in your application. Therefore, it's generally a good idea to
          refactor your code to remove the need for a cycle. To fix this issue,
          you can refactor your code to remove the circular dependency between
          AuthStack.js and BottomTab.js. One way to do this is to extract the
          common code into a separate module and import it into both
          AuthStack.js and BottomTab.js, instead of requiring one module from
          the other. This way, you can avoid the circular dependency and still
          share the common code between the two modules.
        </Text>
        <Text>
          In React Native, a "require cycle" occurs when two or more modules
          require each other in a circular manner. For example, in your case,
          AuthStack.js requires BottomTab.js, which in turn requires
          AuthStack.js again, creating a circular dependency. While require
          cycles are allowed in React Native, they can cause issues with
          uninitialized values, which can result in unexpected behavior or even
          crashes in your application. Therefore, it's generally a good idea to
          refactor your code to remove the need for a cycle. To fix this issue,
          you can refactor your code to remove the circular dependency between
          AuthStack.js and BottomTab.js. One way to do this is to extract the
          common code into a separate module and import it into both
          AuthStack.js and BottomTab.js, instead of requiring one module from
          the other. This way, you can avoid the circular dependency and still
          share the common code between the two modules.
        </Text>
        <Text>
          In React Native, a "require cycle" occurs when two or more modules
          require each other in a circular manner. For example, in your case,
          AuthStack.js requires BottomTab.js, which in turn requires
          AuthStack.js again, creating a circular dependency. While require
          cycles are allowed in React Native, they can cause issues with
          uninitialized values, which can result in unexpected behavior or even
          crashes in your application. Therefore, it's generally a good idea to
          refactor your code to remove the need for a cycle. To fix this issue,
          you can refactor your code to remove the circular dependency between
          AuthStack.js and BottomTab.js. One way to do this is to extract the
          common code into a separate module and import it into both
          AuthStack.js and BottomTab.js, instead of requiring one module from
          the other. This way, you can avoid the circular dependency and still
          share the common code between the two modules.
        </Text>
      </View>
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
