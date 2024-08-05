import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { createUseStyles } from "react-jss";
import BranchSummary from "../../components/BranchSummary";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    background: "#fff",
    minHeight: "100vh",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
});

const BranchAddSuccess: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { branchData } = location.state as any;

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <h2>Branch Add Success</h2>
        <BranchSummary data={branchData} />
        <div className={classes.buttonContainer}>
          <Button onClick={() => navigate("/branch")} type="primary">
            Back to Branch List
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BranchAddSuccess;
