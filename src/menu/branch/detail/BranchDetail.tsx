import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { createUseStyles } from "react-jss";
import { branchData } from "./mockData"; // Mock data import

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
  detailRow: {
    display: "flex",
    marginBottom: "10px",
  },
  label: {
    width: "150px",
    fontWeight: "bold",
    marginRight: 150,
  },
  value: {
    flex: 1,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
});

export default function BranchDetail() {
  const classes = useStyles();
  const navigate = useNavigate();
  //   const { code } = useParams<{ code: string }>();

  // Mock data fetching
  const data = branchData.find((item) => item.code === "001");

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <h2>Branch Details</h2>
        <div className={classes.detailRow}>
          <span className={classes.label}>Code:</span>
          <span className={classes.value}>{data.code}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Name:</span>
          <span className={classes.value}>{data.name}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Description:</span>
          <span className={classes.value}>{data.description}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Address:</span>
          <span className={classes.value}>{data.address}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Phone Number:</span>
          <span className={classes.value}>{data.phoneNumber}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Fax:</span>
          <span className={classes.value}>{data.fax}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Email:</span>
          <span className={classes.value}>{data.email}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>City:</span>
          <span className={classes.value}>{data.city}</span>
        </div>
        <div className={classes.detailRow}>
          <span className={classes.label}>Is Active:</span>
          <span className={classes.value}>{data.isActive ? "YES" : "NO"}</span>
        </div>
        <div className={classes.buttonsContainer}>
          <Button onClick={() => navigate("/branch")} type="default">
            Back
          </Button>
          <Button danger onClick={() => navigate(`/branch/delete/add`)}>
            Delete
          </Button>
          <Button onClick={() => navigate(`/branch/edit/add`)} type="primary">
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
}
