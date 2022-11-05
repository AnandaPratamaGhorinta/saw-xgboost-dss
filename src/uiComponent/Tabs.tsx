import { Tabs as AntdTabs } from "antd";
import React, { useMemo } from "react";

export interface TabsProps {
  key?: string;
  activeKey?: string;
  tabPanes: TabPanesProps[];
}

export default function Tabs({ key, activeKey, tabPanes }: TabsProps) {
  const newTabChildren = useMemo(() => {
    const newPanes: React.ReactNode[] = [];
    tabPanes.forEach((it) => {
      const data = (
        <TabPanes key={it?.key} tab={it?.tab} disable={it?.disable}>
          {it?.children}
        </TabPanes>
      );
      newPanes.push(data);
    });
    return newPanes;
  }, [tabPanes]);

  return (
    <AntdTabs key={key} activeKey={activeKey}>
      {newTabChildren}
    </AntdTabs>
  );
}

export interface TabPanesProps {
  key?: string;
  tab?: React.ReactNode;
  disable?: boolean;
  children?: React.ReactNode;
}

export function TabPanes({ key, tab, children }: TabPanesProps) {
  return (
    <AntdTabs.TabPane key={key} tab={tab}>
      {children}
    </AntdTabs.TabPane>
  );
}
