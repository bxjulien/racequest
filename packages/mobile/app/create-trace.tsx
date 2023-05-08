import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CreateTrace from "../components/features/create-trace/create-trace";

export default function CreateTraceScreen(): JSX.Element {
  return (
    <SafeAreaView>
      <CreateTrace />
    </SafeAreaView>
  );
}
