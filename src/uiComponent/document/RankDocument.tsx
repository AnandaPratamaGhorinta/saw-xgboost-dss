import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface RankingData {
  nama_kos: string;
  kriteria: Record<string, number>;
  total_score: number;
}

interface RankDocumentProps {
  rankingData: RankingData[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

const RankDocument: React.FC<RankDocumentProps> = ({ rankingData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Rangking Table</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Nama Kos</Text>
            </View>
            {Object.keys(rankingData[0].kriteria).map((kriteriaName) => (
              <View key={kriteriaName} style={styles.tableCell}>
                <Text>{kriteriaName}</Text>
              </View>
            ))}
            <View style={styles.tableCell}>
              <Text>Total Score</Text>
            </View>
          </View>
          {rankingData.map((data) => (
            <View key={data.nama_kos} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{data.nama_kos}</Text>
              </View>
              {Object.values(data.kriteria).map((score, index) => (
                <View key={index} style={styles.tableCell}>
                  <Text>{score}</Text>
                </View>
              ))}
              <View style={styles.tableCell}>
                <Text>{data.total_score}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default RankDocument;
