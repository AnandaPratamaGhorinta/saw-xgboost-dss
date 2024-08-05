import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, notification } from "antd";
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
  details: {
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
});

const BranchAddReview: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { branchData } = location.state as any;

  const handleSubmit = () => {
    // Mock final submission
    setTimeout(() => {
      notification.success({
        message: "Branch Added",
        description: "The branch has been successfully added.",
        placement: "topRight",
      });
      navigate("/branch/add/success", { state: { branchData: branchData } });
    }, 1000);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <h2>Review Branch Details</h2>
        <BranchSummary data={branchData} />
        <div className={classes.buttonContainer}>
          <Button onClick={() => navigate("/branch/add/input")} type="default">
            Back
          </Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BranchAddReview;
