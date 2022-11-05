import { Tabs as AntdTabs } from "antd";
import TabPane from "rc-tabs";
import React from "react";

export interface TabsProps {
  children: React.ReactNode;
}
export default function Tabs() {
  return <AntdTabs></AntdTabs>;
}

interface TabPanesProps {
  key: string;
  tab: React.ReactNode;
  disable: boolean;
  children: React.ReactNode;
}

interface TestData {
  billing_1: string;
  billing_2: string;
}

const testData = [
  {
    billing_1: "asdas",
    billing_2: "asdsa",
  },
  {
    billing_1: "asdas",
    billing_2: "asdsa",
  },
];

export function TabPanes({ key, tab, children }: TabPanesProps) {
  const testKey: string[] = [];
}
