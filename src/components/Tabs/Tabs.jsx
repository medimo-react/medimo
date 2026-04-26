import { useState } from "react";
import styles from "./Tabs.module.css";

function Tabs({
  tabs = [],
  defaultValue,
  className = "",
}) {
  const firstValue = tabs[0]?.value;
  const [activeTab, setActiveTab] = useState(defaultValue || firstValue);

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  const tabsClassName = [styles.tabs, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={tabsClassName}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={[
              styles.tabButton,
              activeTab === tab.value ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel} role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
}

export default Tabs;